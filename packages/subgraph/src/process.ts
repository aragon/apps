import {
  AllowedActionsAdded,
  ProcessExecuted,
  ProcessStarted
} from './../generated/templates/Process/Process';
import {
  ProcessHalted,
  ProcessForwarded,
  ProcessStopped
} from './../generated/templates/DisputableProcess/DisputableProcess';
import {VotedOnProcess} from './../generated/templates/VotingProcess/VotingProcess';
import {AllowedAction} from './../generated/schema';

export function handleAllowedActionsAdded(event: AllowedActionsAdded): void {
  let processId = event.address.toHexString();
  let allowedActions = event.params.allowedActions;
  for (let index = 0; index < allowedActions.length; index++) {
    let allowedAction = allowedActions[index];
    let id = processId + '_' + allowedAction.toHexString();

    let entity = new AllowedAction(id);
    entity.process = processId;
    entity.allowedAction = allowedAction;
    entity.isRemoved = false;
    entity.save();
  }
}

export function handleAllowedActionsRemoved(event: AllowedActionsAdded): void {
  let processId = event.address.toHexString();
  let allowedActions = event.params.allowedActions;
  for (let index = 0; index < allowedActions.length; index++) {
    let allowedAction = allowedActions[index];
    let id = processId + '_' + allowedAction.toHexString();

    let entity = AllowedAction.load(id);
    if (entity) {
      entity.isRemoved = true;
      entity.save();
    }
  }
}

export function handleProcessExecuted(event: ProcessExecuted): void {}

export function handleProcessStarted(event: ProcessStarted): void {}

export function handleProcessStopped(event: ProcessStopped): void {}

export function handleProcessForwarded(event: ProcessForwarded): void {}

export function handleProcessHalted(event: ProcessHalted): void {}

export function handleVotedOnProcess(event: VotedOnProcess): void {}
