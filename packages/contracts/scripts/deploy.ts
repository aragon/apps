// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ethers} from 'hardhat';
import {verifyContract} from '../utils/etherscan';
import {promises as fs} from 'fs';
import HRE from 'hardhat';

async function main(forceRegistryDeploy = false) {
  const verifyPromises = [];
  const activeContractsFile = await fs.readFile(
    `${process.env.GITHUB_WORKSPACE}/active_contracts.json`
  );
  const activeContracts = JSON.parse(activeContractsFile.toString());

  let registryAddr = '';
  if (
    activeContracts.hasOwnProperty(HRE.network.name) &&
    activeContracts[HRE.network.name].hasOwnProperty('Registry') &&
    !forceRegistryDeploy
  ) {
    console.log(`Registry already deployed, skipping...`);
    registryAddr = activeContracts[HRE.network.name]['Registry'];
  } else {
    console.log('Deploying Registry...');
    const RegistryFactory = await ethers.getContractFactory('Registry');
    const Registry = await RegistryFactory.deploy();
    registryAddr = Registry.address;
    console.log('Registry deployed at', Registry.address);
    verifyPromises.push(verifyContract(Registry.address, []));
  }

  console.log('Deploying TokenFactory...');
  const TokenFactoryFactory = await ethers.getContractFactory('TokenFactory');
  const TokenFactory = await TokenFactoryFactory.deploy();
  console.log('TokenFactory deployed at', TokenFactory.address);

  console.log('Deploying DAOFactory...');
  const DAOFactoryFactory = await ethers.getContractFactory('DAOFactory');
  const DAOFactory = await DAOFactoryFactory.deploy(
    registryAddr,
    TokenFactory.address
  );
  console.log('DAOFactory deployed at', DAOFactory.address);

  console.log('Verifying contracts');
  verifyPromises.push(verifyContract(TokenFactory.address, []));
  verifyPromises.push(
    verifyContract(DAOFactory.address, [registryAddr, TokenFactory.address])
  );
  await Promise.all(verifyPromises);

  console.log('Deployed & verfied contracts');
  console.log('Registry:', registryAddr);
  console.log('TokenFactory:', TokenFactory.address);
  console.log('DAOFactory:', DAOFactory.address);

  if (process.env.CI) {
    updateFiles(registryAddr, TokenFactory.address, DAOFactory.address);
  }
}

async function updateFiles(
  registryAddr: string,
  TokenFactoryAddr: string,
  DAOFactoryAddr: string
) {
  updateReleasesMD(registryAddr, TokenFactoryAddr, DAOFactoryAddr);
  updateActiveContractsJson(registryAddr, TokenFactoryAddr, DAOFactoryAddr);
}

async function updateActiveContractsJson(
  registryAddr: string,
  TokenFactoryAddr: string,
  DAOFactoryAddr: string
) {
  const activeContractsFile = await fs.readFile(
    `${process.env.GITHUB_WORKSPACE}/active_contracts.json`
  );
  const activeContracts = JSON.parse(activeContractsFile.toString());

  activeContracts[HRE.network.name] = {
    Registry: registryAddr,
    TokenFactory: TokenFactoryAddr,
    DAOFactory: DAOFactoryAddr,
  };

  await fs.writeFile(
    `${process.env.GITHUB_WORKSPACE}/active_contracts.json`,
    JSON.stringify(activeContracts, null, 2)
  );
}

async function updateReleasesMD(
  registryAddr: string,
  TokenFactoryAddr: string,
  DAOFactoryAddr: string
) {
  const releasesContent = await fs.readFile(
    `${process.env.GITHUB_WORKSPACE}/packages/contracts/Releases.md`
  );
  const splitted = releasesContent.toString().split('\n');

  let releasesUpdate = [
    `Time: ${new Date().toISOString()}  `,
    `Commit: [${process.env.GITHUB_SHA}](https://github.com/aragon/zaragoza/commit/${process.env.GITHUB_SHA})  `,
    `Registry: ${registryAddr}  `,
    `TokenFactory: ${TokenFactoryAddr}  `,
    `DAOFactory: ${DAOFactoryAddr}  `,
    '___  ',
  ];

  releasesUpdate = [
    ...splitted.slice(0, 2),
    ...releasesUpdate,
    ...splitted.slice(2),
  ];

  await fs.writeFile(
    `${process.env.GITHUB_WORKSPACE}/packages/contracts/Releases.md`,
    releasesUpdate.join('\n')
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
let forceRegistry = false;
if (process.env.FORCE_REGISTRY_DEPLOY === 'true') {
  forceRegistry = true;
}
main(forceRegistry).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
