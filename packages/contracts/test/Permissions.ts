import {expect} from 'chai';
import {ethers} from 'hardhat';

describe('Permissions', function () {
  describe('with initialization', function () {
    let permissions: any;
    let dao: any;

    before(async function () {
      const Permissions = await ethers.getContractFactory('Permissions');
      permissions = await Permissions.deploy();
      await permissions.deployed();

      const MockDAO = await ethers.getContractFactory('MockDAO');
      dao = await MockDAO.deploy();
      await dao.deployed();
      await permissions.initialize(dao.address);
    });

    it('should be able to set role successfully', async function () {
      const permission = {operator: 1, validators: [], data: []};
      await expect(permissions.setRole('TEST_ROLE', permission)).to.emit(
        permissions,
        'RoleSet'
      );
    });

    it('should be able to check permission', async function () {});
  });
});
