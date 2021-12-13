import {expect} from 'chai';
import {ethers} from 'hardhat';

describe.skip('DAOFactory', function () {
  let registry: any;
  let daoFactory: any;

  before(async function () {
    const Registry = await ethers.getContractFactory('Registry');
    registry = await Registry.deploy();
    await registry.deployed();

    const DAOFactory = await ethers.getContractFactory('DAOFactory');
    daoFactory = await DAOFactory.deploy(registry.address);
    await daoFactory.deployed();
  });

  it('should create dao successfully', async function () {
    const tokenConfig = {
      // zero address to force creation of new token
      addr: ethers.constants.AddressZero,
      name: 'token',
      symbol: 'TOK',
    };
    const votingSettings = [1, 2, 3];
    const vaultSettings = [4, 5, 6];
    const metadata = '0x';

    const tx = await daoFactory.newDAO(
      metadata,
      tokenConfig,
      votingSettings,
      vaultSettings
    );

    await tx.wait();
  });
});
