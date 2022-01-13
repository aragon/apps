/*
 * SPDX-License-Identifier:    MIT
 */
 
pragma solidity 0.8.10;

import "./../stoppable/StoppableProcess.sol";
import "./VotingProcess.sol";

/// @title Abstract implementation of the stoppable voting governance process
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract can be used to implement concrete stoppable voting governance processes and being fully compatible with the DAO framework and UI of Aragon
/// @dev You only have to define the specific custom logic of your needs in _vote, _stop, _start, and _execute
abstract contract StoppableVotingProcess is StoppableProcess, VotingProcess {
    /// @dev Used for UUPS upgradability pattern
    /// @param _allowedActions A dynamic bytes array to define the allowed actions. Addr + funcSig byte strings.
    function initialize(
        IDAO dao,
        bytes[] calldata _allowedActions
    ) public virtual override(StoppableProcess, VotingProcess) initializer {
        _setAllowedActions(_allowedActions);
        _registerStandard(type(StoppableVotingProcess).interfaceId);
        Component.initialize(dao);
    }
}
