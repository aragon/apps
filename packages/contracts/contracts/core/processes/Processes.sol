/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "./types/Process.sol";
import "../permissions/Permissions.sol";
import "../executor/Executor.sol";
import "../component/IDAO.sol";

/// @title The processes contract defining the flow of every interaction with the DAO
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is a central point of the Aragon DAO framework and handles all the processes and stores the different process types with his governance primitives a DAO can have.
/// @dev A list of process types are stored here pluss it validates if the passed actions in a proposal are valid.
contract Processes is UpgradableComponent { 
    bytes32 public constant PROCESSES_START_ROLE = keccak256("PROCESSES_START_ROLE");
    bytes32 public constant PROCESSES_SET_ROLE = keccak256("PROCESSES_SET_ROLE");

    event ProcessStarted(address indexed process, Process.Proposal indexed proposal, uint256 indexed executionId);
    event ProcessSet(string indexed name, Process indexed process);

    mapping(string => Process) public processes; // All existing governance processes in this DAO

    constructor() initializer {}

    /// @dev Used for UUPS upgradability pattern
    /// @param _dao The DAO contract of the current DAO
    function initialize(IDAO _dao) public override initializer {
        Component.initialize(_dao);
    }

    /// @notice Starts the given process resp. primitive by the given proposal
    /// @dev Checks the passed actions, gets the governance primitive of this process, and starts it
    /// @param proposal The proposal for execution submitted by the user.
    /// @return process The Process struct stored
    /// @return executionId The id of the newly created execution.
    function start(Process.Proposal calldata proposal) 
        external 
        authP(PROCESSES_START_ROLE) 
        returns (Process memory process, uint256 executionId) 
    {
        process = processes[proposal.processName];
        executionId = Process(process).start(proposal);
        
        emit ProcessStarted(process, proposal, executionId);

        return (process, executionId);
    }

    /// @notice Adds a new process to the DAO
    /// @param name The name of the new process
    /// @param process The process struct defining the new DAO process
    function setProcess(string calldata name, Process calldata process) 
        public 
        authP(PROCESSES_SET_ROLE) 
    {
        processes[name] = process;

        emit ProcessSet(name, process);
    }
}
