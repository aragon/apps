/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "./processes/Process.sol";

abstract contract IDAO {
    bytes4 internal constant DAO_INTERFACE_ID = type(IDAO).interfaceId;

    // Events
    event SetMetadata(bytes indexed metadata);
    event Executed(address indexed actor, Action[] indexed actions, bytes[] execResults);
    event ProcessAdded(Process indexed process);
    event ProcessRemoved(Process indexed process);
    // ETHDeposited and Deposited are both needed. ETHDeposited makes sure that whoever sends funds
    // with `send/transfer`, receive function can still be executed without reverting due to gas cost
    // increases in EIP-2929. To still use `send/transfer`, access list is needed that has the address
    // of the contract(base contract) that is behind the proxy.
    event ETHDeposited(address sender, uint256 amount);
    event Deposited(address indexed sender, address indexed token, uint256 amount, string _reference);
    event Withdrawn(address indexed token, address indexed to, uint256 amount, string _reference);

    struct Action {
        address to; // Address to call.
        uint256 value; // Value to be sent with the call. for example (ETH)
        bytes data; // FuncSig + arguments
    }

    // Roles
    bytes32 public constant UPGRADE_ROLE = keccak256("UPGRADE_ROLE");
    bytes32 public constant DAO_CONFIG_ROLE = keccak256("DAO_CONFIG_ROLE");
    bytes32 public constant EXEC_ROLE = keccak256("EXEC_ROLE");
    bytes32 public constant WITHDRAW_ROLE = keccak256("WITHDRAW_ROLE");

    // Error msg's
    string internal constant ERROR_ACTION_CALL_FAILED = "ACTION_CALL_FAILED";
    string internal constant ERROR_DEPOSIT_AMOUNT_ZERO = "DEPOSIT_AMOUNT_ZERO";
    string internal constant ERROR_ETH_DEPOSIT_AMOUNT_MISMATCH = "ETH_DEPOSIT_AMOUNT_MISMATCH";
    string internal constant ERROR_ETH_WITHDRAW_FAILED = "ETH_WITHDRAW_FAILED";

    /// @dev Required to handle the permissions within the whole DAO framework accordingly
    /// @param _where The address of the contract
    /// @param _who The address of a EOA or contract to give the permissions
    /// @param _role The hash of the role identifier
    /// @param _data The optional data passed to the ACLOracle registered.
    /// @return bool
    function hasPermission(address _where, address _who, bytes32 _role, bytes memory _data) virtual external returns(bool);

    /// @notice Update the DAO metadata
    /// @dev Sets a new IPFS hash
    /// @param _metadata The IPFS hash of the new metadata object
    function setMetadata(bytes calldata _metadata) virtual external;

    /// @notice Add new process to DAO
    /// @dev Grants the new process execution rights and amits the related event.
    /// @param _process The address of the new process
    function addProcess(Process _process) virtual external;

    /// @notice Remove process from DAO
    /// @dev Revokes the execution rights from the process and emits the related event.
    /// @param _process The address of the new process
    function removeProcess(Process _process) virtual external;

    /// @notice If called, the list of provided actions will be executed.
    /// @dev It run a loop through the array of acctions and execute one by one.
    /// @dev If one acction fails, all will be reverted.
    /// @param _actions The aray of actions
    function execute(Action[] memory _actions) virtual external;

    /// @notice Deposit ETH or any token to this contract with a reference string
    /// @dev Deposit ETH (token address == 0) or any token with a reference
    /// @param _token The address of the token and in case of ETH address(0)
    /// @param _amount The amount of tokens to deposit
    /// @param _reference The deposit reference describing the reason of it
    function deposit(address _token, uint256 _amount, string calldata _reference) virtual external payable;

    /// @notice Withdraw tokens or ETH from the DAO with a withdraw reference string
    /// @param _token The address of the token and in case of ETH address(0)
    /// @param _to The target address to send tokens or ETH
    /// @param _amount The amount of tokens to deposit
    /// @param _reference The deposit reference describing the reason of it
    function withdraw(address _token, address _to, uint256 _amount, string memory _reference) virtual external;
}
