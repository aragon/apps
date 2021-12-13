import {expect} from 'chai';
import {ethers} from 'hardhat';

const abi = [
  'function deposit(address _token, uint256 _value, string calldata _description)',
];

describe('Executor', function () {
  describe('with initialization', function () {
    let executor: any;
    let dao: any;

    before(async function () {
      const Executor = await ethers.getContractFactory('Executor');
      executor = await Executor.deploy();
      await executor.deployed();

      const MockDAO = await ethers.getContractFactory('MockDAO');
      dao = await MockDAO.deploy();
      await dao.deployed();
      await executor.initialize(dao.address);
    });

    it('should be able to execute empty array of action successfully', async function () {
      const actions: any = [];
      await expect(executor.execute(actions)).to.emit(executor, 'Executed');
    });

    it('should be able to execute array of 1 action', async function () {
      const Vault = await ethers.getContractFactory('Vault');
      const vault = await Vault.deploy();
      await vault.deployed();

      // call the vault received function
      const data = '0x';
      const value = 0;
      const actions: any = [{to: vault.address, value, data}];
      await expect(executor.execute(actions)).to.emit(executor, 'Executed');
    });
  });
});
