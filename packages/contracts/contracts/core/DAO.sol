/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "./component/Component.sol";
import "./processes/Processes.sol";
import "./processes/types/Process.sol";
import "./executor/Executor.sol";
import "./acl/ACL.sol";

/// @title The public interface of the Aragon DAO framework.
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is the entry point to the Aragon DAO framework and provides our users a simple and use to use public interface.
/// @dev Public API of the Aragon DAO framework
contract DAO is Component, ACL {
    // Roles
    bytes32 public constant DAO_CONFIG_ROLE = keccak256("DAO_CONFIG_ROLE");
    bytes32 public constant UPGRADE_ROLE = keccak256("UPGRADE_ROLE");

    bytes public metadata;
    Processes public processes;
    Executor public executor;

    /// @dev Used for UUPS upgradability pattern
    /// @param _metadata IPFS hash that points to all the metadata (logo, description, tags, etc.) of a DAO
    /// @param _processes All the processes a DAO has
    /// @param _executor The executor to interact with any internal or third party contract
    function initialize(
        bytes calldata _metadata,
        Processes _processes,
        Executor _executor,
        address _aclRoot
    ) public initializer {
        metadata = _metadata;
        processes = _processes;
        executor = _executor;

        ACL.initACL(_aclRoot);
    }

    function _authorizeUpgrade(address) internal virtual override auth(address(this), UPGRADE_ROLE) { }
    
    /// @notice If called a new governance process based on the submitted proposal does get kicked off
    /// @dev Validates the permissions, validates the actions passed, and start a new process execution based on the proposal.
    /// @param proposal The proposal submission of the user
    /// @return process The started process with his definition
    /// @return executionId The execution id
    function submit(Process.Proposal calldata proposal) external returns (Processes.Process memory process, uint256 executionId) {
        return processes.start(proposal);
    }

    /// @notice Update the DAO metadata
    /// @dev Sets a new IPFS hash
    /// @param _metadata The IPFS hash of the new metadata object
    function setMetadata(bytes calldata _metadata) external auth(address(this), DAO_CONFIG_ROLE) {
        metadata = _metadata;   
    }

    /// @notice Adds a new process to the DAO
    /// @dev Based on the name and the passed Process struct does a new entry get added in Processes
    /// @param name The name of the process as string
    /// @param process The struct defining the governance primitive, allowed actions, permissions, and metadata IPFS hash to describe the process 
    function setProcess(string calldata name, Processes.Process calldata process) external auth(address(this), DAO_CONFIG_ROLE) {
        processes.setProcess(name, process);
    }

    /// @notice Sets a new executor address in case it needs to get replaced at all
    /// @dev Updates the executor contract property
    /// @param _executor The address of the new executor
    function setExecutor(Executor _executor) external auth(address(this), DAO_CONFIG_ROLE) {
        executor = _executor;
    }
} 
