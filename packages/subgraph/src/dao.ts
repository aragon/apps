import {
  DAO as DAOContract,
  SetMetadata,
  AddProcess,
  RemoveProcess,
  Executed,
  Deposited,
  ETHDeposited,
  Withdrawn
} from '../generated/templates/DAO/DAO';
import {DAO, SimpleVoting} from '../generated/templates';
import {
  Dao,
  Process,
  VaultEthDeposit,
  VaultDeposit,
  VaultWithdraw
} from '../generated/schema';
import {log} from 'matchstick-as/assembly/index';

export function handleAddProcess(event: AddProcess): void {
  let processAddress = event.params.process;
  let daoAddress = event.address;
  let processId = processAddress.toHexString();
  let daoId = daoAddress.toHexString();
  let daoEntity = Dao.load(daoId);

  if (daoEntity == null) {
    daoEntity = new Dao(daoId);

    // subscribe to templates
    DAO.create(event.address);
  }

  let processEntity = new Process(processId);
  processEntity.dao = daoAddress.toHexString();
  processEntity.address = processAddress;
  processEntity.isActive = true;

  // subscribe to templates
  SimpleVoting.create(processAddress);

  daoEntity.save();
  processEntity.save();
}

export function handleRemoveProcess(event: RemoveProcess): void {
  let processAddress = event.params.process;
  let daoAddress = event.address;
  let processId = processAddress.toHexString();
  let daoId = daoAddress.toHexString();
  let daoEntity = Dao.load(daoId);

  if (daoEntity == null) {
    daoEntity = new Dao(daoId);

    // subscribe to templates
    DAO.create(event.address);
  }

  let processEntity = Process.load(processId);
  if (processEntity == null) {
    processEntity = new Process(processId);
    processEntity.dao = daoAddress.toHexString();
    processEntity.address = processAddress;
    // subscribe to templates
    SimpleVoting.create(processAddress);
  }
  processEntity.isActive = false;

  daoEntity.save();
  processEntity.save();
}

export function handleSetMetadata(event: SetMetadata): void {
  let id = event.address.toHexString();
  let entity = Dao.load(id);
  if (entity == null) {
    entity = new Dao(id);

    // subscribe to templates
    DAO.create(event.address);
  }
  entity.metadata = event.params.metadata.toString();
  entity.save();
}

export function handleExecuted(event: Executed): void {
  // TODO: understand Execution
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
  if (entity != null) {
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
  if (entity != null) {
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
  if (entity != null) {
    entity.dao = daoId;
    entity.token = event.params.token;
    entity.to = event.params.to;
    entity.amount = event.params.amount;
    entity.reason = event.params._reference;
    entity.save();
  }
}
