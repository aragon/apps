import {
  AllowedActionsAdded,
  ProcessExecuted,
  ProcessStarted,
  VotedOnProcess
} from './../generated/templates/ProcessCore/All';
import {DAO as DAOContract} from './../generated/templates/DAO/DAO';
import {DAO} from './../generated/templates';
import {AllowedAction} from './../generated/schema';
import {DataSourceContext} from '@graphprotocol/graph-ts';

export function handleAllowedActionsAdded(event: AllowedActionsAdded): void {
  let processId = event.address.toHexString();
  let allowedActions = event.params.allowedActions;
  for (let index = 0; index < allowedActions.length; index++) {
    let allowedAction = allowedActions[index];
    let id =
      event.address.toHexString() +
      '_' +
      event.transaction.hash.toString() +
      '_' +
      event.transactionLogIndex.toString() +
      '_' +
      index.toString();

    let entity = new AllowedAction(id);
    entity.process = processId;
    entity.allowedAction = allowedAction;
    entity.save();
  }
}

export function handleProcessExecuted(event: ProcessExecuted): void {}

export function handleProcessStarted(event: ProcessStarted): void {}

export function handleVotedOnProcess(event: VotedOnProcess): void {}
