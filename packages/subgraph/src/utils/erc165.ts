import {ethereum, Bytes} from '@graphprotocol/graph-ts';
import {Templates} from './constants';

function supportsInterface(
  contract: ethereum.SmartContract,
  interfaceId: string,
  expected: boolean = true
): boolean {
  let result = ethereum.call(
    new ethereum.SmartContractCall(
      contract._name, // '',
      contract._address, // address,
      'supportsInterface', // '',
      'supportsInterface(bytes4):(bool)',
      [ethereum.Value.fromFixedBytes(Bytes.fromHexString(interfaceId) as Bytes)]
    )
  );
  return (
    result != null &&
    (result as Array<ethereum.Value>)[0].toBoolean() == expected
  );
}

export function getSupportedTemplates(
  contract: ethereum.SmartContract
): Templates[] {
  let supportedTemplates: Templates[] = new Array();
  let introspection_ERC165 = supportsInterface(contract, '01ffc9a7'); // ERC165

  // if contract do not support ERC165, we don't need to check more
  if (introspection_ERC165) {
    // Check for voting
    let introspection_Voting = supportsInterface(contract, '1ff90d73'); // VotedOnProcess
    if (introspection_Voting) {
      supportedTemplates.push(Templates.VOTING);
    }

    // Check for stoppable
    let introspection_Stopable = supportsInterface(contract, 'adf526f3'); // ProcessStopped
    if (introspection_Stopable) {
      supportedTemplates.push(Templates.STOPPABLE);
    }

    // Check for disputable
    let introspection_DisputableForwarded = supportsInterface(
      contract,
      'a4035eed'
    ); // ProcessForwarded
    let introspection_DisputableHalted = supportsInterface(
      contract,
      '31e5e023'
    ); // ProcessHalted
    if (introspection_DisputableForwarded && introspection_DisputableHalted) {
      supportedTemplates.push(Templates.DISPUTABLE);
    }

    // Check for process
    let introspection_AllowedActionsAdded = supportsInterface(
      contract,
      '3e93aaa0'
    ); // AllowedActionsAdded
    let introspection_AllowedActionsRemoved = supportsInterface(
      contract,
      'f175190d'
    ); // AllowedActionsRemoved
    let introspection_ProcessExecuted = supportsInterface(contract, '06525655'); // ProcessExecuted
    let introspection_ProcessStarted = supportsInterface(contract, '295febe7'); // ProcessStarted
    if (
      introspection_AllowedActionsAdded &&
      introspection_AllowedActionsRemoved &&
      introspection_ProcessExecuted &&
      introspection_ProcessStarted
    ) {
      supportedTemplates.push(Templates.PROCESS);
    }
  }

  // Unknown process
  if (supportedTemplates.length == 0) {
    supportedTemplates.push(Templates.UNKNOWN);
  }

  return supportedTemplates;
}
