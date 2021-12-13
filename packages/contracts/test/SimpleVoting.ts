import {expect} from 'chai';
import {ethers} from 'hardhat';

describe.skip('SimpleVoting', function () {
  describe('with initialization', function () {
    let voting: any;
    let dao: any;
    let token: any;
    let voteSettings = [50, 50, 10];

    before(async function () {
      const Permissions = await ethers.getContractFactory('Permissions');
      const permissions = await Permissions.deploy();
      await permissions.deployed();

      const MockDAO = await ethers.getContractFactory('MockDAO');
      dao = await MockDAO.deploy();
      await dao.deployed();

      const tx = await dao.initialize(permissions.address);
      await tx.wait();

      const SimpleVoting = await ethers.getContractFactory('SimpleVoting');
      voting = await SimpleVoting.deploy();
      await voting.deployed();

      const ERC20 = await ethers.getContractFactory('GovernanceERC20');
      token = await ERC20.deploy();
      await token.deployed();
      await voting.functions['initialize(address,address,uint64[3])'](
        dao.address,
        token.address,
        voteSettings
      );
    });

    it('should start successfully', async function () {
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

      const proposal = {
        processName: 'processName', // The hash of the process that should get called
        actions: [{to: dao.address, value: 1, data: '0x'}], // The actions that should get executed in the end
        metadata: '0x', // IPFS hash pointing to the metadata as description, title, image etc.
        additionalArguments: '0x', // Optional additional arguments a process resp. governance primitive does need
      };

      const tx = await voting.start(process, proposal);
      /*const receipt = await tx.wait();
      console.log('voting start receipt', receipt);
      expect(receipt.events[0].event).to.eq('GovernancePrimitiveStarted');
      */
    });
  });
});
