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
import {SimpleVoting} from '../generated/templates';
import {
  Dao,
  Process,
  VaultEthDeposit,
  VaultDeposit,
  VaultWithdraw
} from '../generated/schema';
import {log} from 'matchstick-as/assembly/index';

export function handleProcessAdded(event: ProcessAdded): void {
  let processAddress = event.params.process;
  let processId = processAddress.toHexString();

  let processEntity = new Process(processId);

  processEntity.dao = event.address.toHexString();
  processEntity.address = processAddress;
  processEntity.isActive = true;

  // subscribe to templates
  // TODO: verfy process type via supportsInterface
  SimpleVoting.create(processAddress);

  processEntity.save();
}

export function handleProcessRemoved(event: ProcessRemoved): void {
  let processId = event.params.process.toHexString();

  let processEntity = Process.load(processId);

  if (processEntity) {
    processEntity.isActive = false;
    processEntity.save();
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
