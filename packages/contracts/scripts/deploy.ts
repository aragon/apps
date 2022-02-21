// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import {ethers} from 'hardhat';
import {verifyContract} from '../utils/etherscan'

async function main() {
  console.log('Deploying Registry...');
  const RegistryFactory = await ethers.getContractFactory('Registry');
  const Registry = await RegistryFactory.deploy();
  console.log('Registry deployed at', Registry.address);

  console.log('Deploying TokenFactory...');
  const TokenFactoryFactory = await ethers.getContractFactory('TokenFactory');
  const TokenFactory = await TokenFactoryFactory.deploy();
  console.log('TokenFactory deployed at', TokenFactory.address);

  console.log('Deploying DAOFactory...');
  const DAOFactoryFactory = await ethers.getContractFactory('DAOFactory');
  const DAOFactory = await DAOFactoryFactory.deploy(
    Registry.address,
    TokenFactory.address
  );
  console.log('DAOFactory deployed at', DAOFactory.address);

  console.log('Verifying contracts');
  const verifyPromises = []
  verifyPromises.push(verifyContract(Registry.address, []));
  verifyPromises.push(verifyContract(TokenFactory.address, []));
  verifyPromises.push(verifyContract(DAOFactory.address, [Registry.address, TokenFactory.address]));
  await Promise.all(verifyPromises);

  console.log('Deployed & verfied contracts');
  console.log('Registry:', Registry.address);
  console.log('TokenFactory:', TokenFactory.address);
  console.log('DAOFactory:', DAOFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
