import {expect} from 'chai';
import {ethers} from 'hardhat';
import { Process } from '../typechain'

const EVENTS = {
    ProcessStarted: 'ProcessStarted',
    ProcessExecuted: 'ProcessExecuted',
    AllowedActionsAdded: 'AllowedActionsAdded',
    AllowedActionsRemoved: 'AllowedActionsRemoved'
}

const ERRORS = {
    ERROR_EXECUTION_STATE_WRONG: 'ERROR_EXECUTION_STATE_WRONG',
    ERROR_NO_EXECUTION: 'ERROR_NO_EXECUTION'
}

describe('Process', function () {
  let process: any;
  let ownerAddress: string;

  before(async () => {
    const signers = await ethers.getSigners()
    ownerAddress = await signers[0].getAddress();
  })

  beforeEach(async function () {
    const Process = await ethers.getContractFactory('Process');
    process = (await Process.deploy()) as Process;
  });

  it('Calls initialize and sets up the Process contract as expected', async function () { });

  it('Calls addAllowedActions and adds the actions as expected to the allowedActions storage variable', async function () { });

  it('Calls removeAllowedActions and removes the actions as expected from the allowedActions storage variable', async function () { });

  it('Calls start and adds a new execution to the process as expected', async function () { });

  it('Calls start and reverts cause a not allowed action was in the proposal', async function () { });

  it('Calls execute and emits the expected event', async function () { });

  it('Calls execute and reverts cause the state of the process is wrong', async function () { });
});
