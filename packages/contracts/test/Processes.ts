import {expect} from 'chai';
import {ethers} from 'hardhat';

describe('Processes', function () {
  describe('with initialization', function () {
    let processes: any;
    let dao: any;

    before(async function () {
      const Processes = await ethers.getContractFactory('Processes');
      processes = await Processes.deploy();
      await processes.deployed();

      const MockDAO = await ethers.getContractFactory('MockDAO');
      dao = await MockDAO.deploy();
      await dao.deployed();
      await processes.initialize(dao.address);
    });

    it('should be able to set a process successfully', async function () {
      const process = {
        governancePrimitive: ethers.constants.AddressZero,
        permissions: {
          start: 'start',
          execute: 'execute',
          halt: 'halt',
          forward: 'forward',
          stop: 'stop',
          vote: 'vote',
        },
        allowedActions: [],
        metadata: '0x',
      };

      const tx = await processes.setProcess('name', process);
      const receipt = await tx.wait();
      expect(receipt.events[0].event).to.eq('ProcessSet');
    });
  });
});
