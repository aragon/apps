/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../lib/governance-primitives/GovernancePrimitive.sol";
import "./permissions/Permissions.sol";
import "./processes/Processes.sol";
import "./executor/Executor.sol";

// TODO: Add ACL for inter-contract permissions (it is not the same as user roles!)
/// @title The public interface of the Aragon DAO framework.
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is the entry point to the Aragon DAO framework and provides our users a simple and use to use public interface.
/// @dev Public API of the Aragon DAO framework
contract DAO is UUPSUpgradeable, Initializable {
    event NewProposal(GovernancePrimitive.Proposal indexed proposal, Processes.Process indexed process, address indexed submitter, uint256 executionId);

    bytes public metadata;
    Processes public processes;
    Permissions public permissions;
    Executor public executor;

    /// @dev Used for UUPS upgradability pattern
    /// @param _metadata IPFS hash that points to all the metadata (logo, description, tags, etc.) of a DAO
    /// @param _processes All the processes a DAO has
    /// @param _permissions All roles a DAO has
    /// @param _executor The executor to interact with any internal or third party contract
    function initialize(
        bytes calldata _metadata,
        Processes _processes,
        Permissions _permissions,
        Executor _executor
    ) external initializer {
        metadata = _metadata;
        processes = _processes;
        permissions = _permissions;
        executor = _executor;
    }

    /// @dev Used for UUPS upgradability pattern
    /// @param _executor The executor that can update this contract
    function _authorizeUpgrade(address _executor) internal view override {
        require(address(executor) == _executor, "Only the executor can call this!");
    }

    /// @notice If called a new governance process based on the submitted proposal does get kicked off
    /// @dev Validates the permissions, validates the actions passed, and start a new process execution based on the proposal.
    /// @param proposal The proposal submission of the user
    /// @return process The started process with his definition
    /// @return executionId The execution id
    function start(GovernancePrimitive.Proposal calldata proposal) external returns (Processes.Process memory process, uint256 executionId) {
        return processes.start(proposal);
    }

    /// @notice If called a executable proposal does get executed.
    /// @dev Some governance primitives needed to be executed with a additional user based call.
    /// @param executionID The executionId
    /// @param governancePrimitive The primitive to call execute.
    function execute(uint256 executionID, GovernancePrimitive governancePrimitive) external {
        GovernancePrimitive(governancePrimitive).execute(executionID);
    }

    /// @notice Update the DAO metadata
    /// @dev Sets a new IPFS hash
    /// @param _metadata The IPFS hash of the new metadata object
    function setMetadata(bytes calldata _metadata) external {
        metadata = _metadata;   
    }

    /// @notice Adds a new role to the permission management
    /// @dev Based on the name and the passed Permission struct does a new entry get added in Permissions
    /// @param role The name of the role as string
    /// @param permission The struct defining the logical operator and validators set for this role
    function addRole(string calldata role, Permissions.Permission calldata permission) external {
        permissions.addRole(role, permission);
    }

    /// @notice Adds a new process to the DAO
    /// @dev Based on the name and the passed Process struct does a new entry get added in Processes
    /// @param name The name of the process as string
    /// @param process The struct defining the governance primitive, allowed actions, permissions, and metadata IPFS hash to describe the process 
    function setProcess(string calldata name, Processes.Process calldata process) external  {
        processes.setProcess(name, process);
    }

    /// @notice Sets a new executor address in case it needs to get replaced at all
    /// @dev Updates the executor contract property
    /// @param _executor The address of the new executor
    function setExecutor(Executor _executor) external {
        executor = _executor;
    }
} 
