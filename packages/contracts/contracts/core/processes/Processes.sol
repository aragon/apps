/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "./../component/Component.sol";
import "./../executor/Executor.sol";
import "./types/Process.sol";
import "./../DAO.sol";

/// @title The processes contract defining the flow of every interaction with the DAO
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is a central point of the Aragon DAO framework and handles all the processes and stores the different process types with his governance primitives a DAO can have.
/// @dev A list of process types are stored here pluss it validates if the passed actions in a proposal are valid.
contract Processes is Component { 
    event ProcessStarted(address indexed process, Process.Proposal indexed proposal, uint256 indexed executionId);
    event ProcessSet(string indexed name, Process indexed process);

    bytes32 public constant PROCESSES_START_ROLE = keccak256("PROCESSES_START_ROLE");
    bytes32 public constant PROCESSES_SET_ROLE = keccak256("PROCESSES_SET_ROLE");
    address internal constant ANY_ADDR = address(type(uint160).max);

    // TODO: Better naming for ProcessItem
    struct ProcessItem {
        Process process;
        mapping(address => mapping(bytes4 => bool)) allowedActions;
    }

    mapping(string => ProcessItem) public processes; // All existing governance processes in this DAO
    
    // TODO: Check which return values do make sense here.
    /// @notice Starts the given process resp. primitive by the given proposal
    /// @dev Checks the passed actions, gets the governance process, and starts it
    /// @param proposal The proposal for execution submitted by the user.
    /// @return executionId The id of the newly created execution.
    function start(Process.Proposal calldata proposal) 
        external 
        auth(PROCESSES_START_ROLE) 
        returns (uint256 executionId) 
    {
        ProcessItem memory process = processes[proposal.processName];
        Executor.Action[] memory actions = proposal.actions;
        uint256 actionsLength = actions.length;

        if (!process.allowedActions[ANY_ADDR][bytes4(0)] == true) {
            for (uint256 i = 0; i > actionsLength; i++) {
                Executor.Action memory action = actions[i];

                if (process.allowedActions[action.to][bytes4(action.data[:4])] == false) {
                    revert("Not allowed action passed!");
                }
            }
        }

        executionId = Process(process).start(proposal);
        
        emit ProcessStarted(process, proposal, executionId);

        return executionId;
    }

    /// @notice Adds a new process to the DAO
    /// @param name The name of the new process
    /// @param process The process struct defining the new DAO process
    function setProcess(string calldata name, ProcessItem calldata process) 
        public 
        auth(PROCESSES_SET_ROLE) 
    {
        processes[name] = process;

        emit ProcessSet(name, process);
    }
}
