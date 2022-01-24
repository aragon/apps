import {
  DAO as DAOContract,
  SetMetadata,
  ProcessAdded,
  ProcessRemoved,
  Executed,
  Deposited,
  ETHDeposited,
  Withdrawn
} from '../generated/templates/DAO/DAO';
import {
  SimpleVoting,
  Process as MainProcess,
  DisputableProcess,
  StoppableProcess,
  VotingProcess
} from '../generated/templates';
import {SimpleVoting as SimpleVotingContract} from '../generated/templates/SimpleVoting/SimpleVoting';
import {
  Dao,
  Process,
  VaultEthDeposit,
  VaultDeposit,
  VaultWithdraw,
  ProcessDao
} from '../generated/schema';
import {DataSourceContext, store} from '@graphprotocol/graph-ts';
import {log} from 'matchstick-as/assembly/index';
import {getSupportedTemplates} from './utils/erc165';
import {Templates} from './utils/constants';

export function handleProcessAdded(event: ProcessAdded): void {
  let daoId = event.address.toHexString();
  let processAddress = event.params.process;
  let processId = processAddress.toHexString();

  // handle ProcessDao
  let processDaoId = processId + '_' + daoId;
  let processDaoEntity = new ProcessDao(processDaoId);
  processDaoEntity.process = processId;
  processDaoEntity.dao = daoId;

  // handle Process
  let processEntity = new Process(processId);

  // create context
  let context = new DataSourceContext();
  context.setString('daoAddress', daoId);

  // subscribe to templates
  let processContract = SimpleVotingContract.bind(processAddress);
  let supportedTemplates = getSupportedTemplates(processContract);
  for (let index = 0; index < supportedTemplates.length; index++) {
    const template = supportedTemplates[index];
    switch (template) {
      case Templates.PROCESS:
        MainProcess.createWithContext(processAddress, context);
      case Templates.DISPUTABLE:
        DisputableProcess.createWithContext(processAddress, context);
      case Templates.STOPPABLE:
        StoppableProcess.createWithContext(processAddress, context);
      case Templates.VOTING:
        VotingProcess.createWithContext(processAddress, context);
    }
  }

  processDaoEntity.save();
  processEntity.save();
}

export function handleProcessRemoved(event: ProcessRemoved): void {
  let id =
    event.address.toHexString() + '_' + event.params.process.toHexString();

  let entity = ProcessDao.load(id);

  if (entity) {
    store.remove('ProcessDao', id);
  }
}

export function handleSetMetadata(event: SetMetadata): void {
  let id = event.address.toHexString();
  let entity = Dao.load(id);
  if (entity) {
    entity.metadata = event.params.metadata.toString();
    entity.save();
  }
}

export function handleExecuted(event: Executed): void {
  // TODO:
}

export function handleDeposited(event: Deposited): void {
  let daoId = event.address.toHexString();
  let id =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toString() +
    '_' +
    event.transactionLogIndex.toString();

  let entity = VaultDeposit.load(id);
  if (entity) {
    entity.dao = daoId;
    entity.token = event.params.token;
    entity.sender = event.params.sender;
    entity.amount = event.params.amount;
    entity.reason = event.params._reference;
    entity.save();
  }
}

export function handleETHDeposited(event: ETHDeposited): void {
  let daoId = event.address.toHexString();
  let id =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toString() +
    '_' +
    event.transactionLogIndex.toString();

  let entity = VaultEthDeposit.load(id);
  if (entity) {
    entity.dao = daoId;
    entity.sender = event.params.sender;
    entity.amount = event.params.amount;
    entity.save();
  }
}

export function handleWithdrawn(event: Withdrawn): void {
  let daoId = event.address.toHexString();
  let id =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toString() +
    '_' +
    event.transactionLogIndex.toString();

  let entity = VaultWithdraw.load(id);
  if (entity) {
    entity.dao = daoId;
    entity.token = event.params.token;
    entity.to = event.params.to;
    entity.amount = event.params.amount;
    entity.reason = event.params._reference;
    entity.save();
  }
}
