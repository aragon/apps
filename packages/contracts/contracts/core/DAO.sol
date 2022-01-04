/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "./processes/types/Process.sol";
import "./component/Component.sol";
import "./acl/ACL.sol";
import "./IDAO.sol";

// TODO: Add ERC1271
/// @title The public interface of the Aragon DAO framework.
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is the entry point to the Aragon DAO framework and provides our users a simple and use to use public interface.
/// @dev Public API of the Aragon DAO framework
contract DAO is IDAO, Initializable, UUPSUpgradeable, ACL {
    // Events
    event SetMetadata(bytes indexed metadata);
    event Executed(address indexed actor, Action[] indexed actions, bytes[] execResults);
    event AddProcess(Process indexed process);
    event RemoveProcess(Process indexed process);
    // ETHDeposited and Deposited are both needed. ETHDeposited makes sure that whoever sends funds
    // with `send/transfer`, receive function can still be executed without reverting due to gas cost
    // increases in EIP-2929. To still use `send/transfer`, access list is needed that has the address
    // of the contract(base contract) that is behind the proxy.
    event ETHDeposited(address sender, uint256 amount);
    event Deposited(address indexed sender, address indexed token, uint256 amount, string _reference);
    event Withdrawn(address indexed token, address indexed to, address from, uint256 amount, string _reference);
    
    // Roles
    bytes32 public constant UPGRADE_ROLE = keccak256("UPGRADE_ROLE");
    bytes32 public constant DAO_CONFIG_ROLE = keccak256("DAO_CONFIG_ROLE");
    bytes32 public constant EXEC_ROLE = keccak256("EXEC_ROLE");

    // Error msg's
    string private constant ERROR_ACTION_CALL_FAILED = "ACTION_CALL_FAILED";
    string private constant ERROR_DEPOSIT_AMOUNT_ZERO = "DEPOSIT_AMOUNT_ZERO";
    string private constant ERROR_ETH_DEPOSIT_AMOUNT_MISMATCH = "ETH_DEPOSIT_AMOUNT_MISMATCH";
    string private constant ERROR_TOKEN_NOT_CONTRACT = "TOKEN_NOT_CONTRACT";
    string private constant ERROR_TOKEN_DEPOSIT_FAILED = "TOKEN_DEPOSIT_FAILED";
    string private constant ERROR_TOKEN_WITHDRAW_FAILED = "TOKEN_WITHDRAW_FAILED";
    string private constant ERROR_ETH_WITHDRAW_FAILED = "ETH_WITHDRAW_FAILED";

    struct Action {
        address to; // Address to call.
        uint256 value; // Value to be sent with the call. for example (ETH)
        bytes data; // FuncSig + arguments
    }

    /// @dev Used for UUPS upgradability pattern
    /// @param _metadata IPFS hash that points to all the metadata (logo, description, tags, etc.) of a DAO
    function initialize(
        bytes calldata _metadata,
    ) public initializer {
        setMetadata(_metadata);
        ACL.initACL(address(this));
    }

    /// @dev Used to check the permissions within the upgradability pattern implementation of OZ
    function _authorizeUpgrade(address) internal virtual override auth(address(this), UPGRADE_ROLE) { }

    /// @notice Checks if the current callee has the permissions for.
    /// @dev Wrapper for the willPerform method of ACL to later on be able to use it in the modifier of the sub components of this DAO.
    /// @param _where Which contract does get called
    /// @param _who Who is calling this method
    /// @param _role Which role is required to call this
    /// @param data Additional data used in the ACLOracle
    function hasPermission(address _where, address _who, bytes32 _role, bytes memory data) public override returns(bool) {
        return willPerform(_where, _who, _role, data);
    }

    /// @notice Update the DAO metadata
    /// @dev Sets a new IPFS hash
    /// @param _metadata The IPFS hash of the new metadata object
    function setMetadata(bytes calldata _metadata) external auth(address(this), DAO_CONFIG_ROLE) {
        emit SetMetadata(_metadata);
    }

    /// @notice Add new process to DAO
    /// @dev Grants the new process execution rights and amits the related event.
    /// @param process The address of the new process
    function addProcess(Process process) external auth(address(this), DAO_CONFIG_ROLE) {
        grant(address(this), process, EXEC_ROLE);
        emit ProcessAdded(process);
    }

    /// @notice Remove process from DAO
    /// @dev Revokes the execution rights from the process and emits the related event.
    /// @param process The address of the new process
    function removeProcess(Process process) external auth(address(this), DAO_CONFIG_ROLE) {
        revoke(address(this), process, EXEC_ROLE);
        emit ProcessRemoved(process);
    }

    /// @notice If called, the list of provided actions will be executed.
    /// @dev It run a loop through the array of acctions and execute one by one.
    /// @dev If one acction fails, all will be reverted.
    /// @param actions The aray of actions
    function execute(Action[] memory actions) external auth(EXEC_ROLE) {
        bytes[] memory execResults = new bytes[](actions.length);

        for (uint256 i = 0; i < actions.length; i++) {
          (bool success, bytes memory response) = actions[i].to.call{ value: actions[i].value }(actions[i].data);

          require(success, ERROR_ACTION_CALL_FAILED);

          execResults[i] = response;
        }

        emit Executed(msg.sender, actions, execResults);
    }

    // @dev Emit ETHDeposited event to track ETH deposits that weren't done over the deposit method.
    receive () external payable {
        emit ETHDeposited(msg.sender, msg.value);
    }

    // @notice Deposit ETH or any token to this contract with a reference string
    // @dev Deposit ETH (token address == 0) or any token with a reference
    // @param _token The address of the token and in case of ETH address(0)
    // @param _amount The amount of tokens to deposit
    // @param _reference The deposit reference describing the reason of it
    function deposit(address _token, uint256 _amount, string calldata _reference) external payable {
        require(_amount > 0, ERROR_DEPOSIT_AMOUNT_ZERO);

        if (_token == address(0)) {
            require(msg.value == _amount, ERROR_ETH_DEPOSIT_AMOUNT_MISMATCH);
        } else {
            require(_token.isContract(), ERROR_TOKEN_NOT_CONTRACT);
            require(ERC20(_token).safeTransferFrom(msg.sender, address(this), _amount), ERROR_TOKEN_DEPOSIT_FAILED);
        }

        emit Deposited(msg.sender, _token, _amount, _reference);
    }

    // @notice Withdraw tokens or ETH from the DAO with a withdraw reference string
    // @param _token The address of the token and in case of ETH address(0)
    // @param _to The target address to send tokens or ETH
    // @param _amount The amount of tokens to deposit
    // @param _reference The deposit reference describing the reason of it
    function withdraw(address _token, address _to, uint256 _amount, string memory _reference) public auth(WITHDRAW_ROLE) {
        if (_token == address(0)) {
            (bool ok, ) = _to.call{value: _amount}("");
            require(ok, ERROR_ETH_WITHDRAW_FAILED);
        } else {
            require(ERC20(_token).safeTransfer(_to, _amount), ERROR_TOKEN_WITHDRAW_FAILED);
        }
        
        emit Withdrawn(_token, _to, _amount, _reference);
    }
} 
