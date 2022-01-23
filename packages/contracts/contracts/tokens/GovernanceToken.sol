/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../core/IDAO.sol";
import "../permissions/DAOPermissionHandler.sol";

abstract contract GovernanceToken is Initializable, DAOPermissionHandler, ERC20VotesUpgradeable {

    /// @notice The role identifier to mint new tokens
    bytes32 public constant TOKEN_MINTER_ROLE = keccak256("TOKEN_MINTER_ROLE");
    
    function __Initialize_Token(IDAO _dao, string calldata _name, string calldata _symbol) internal initializer {
        __ERC20_init(_name, _symbol);
        __ERC20Permit_init(_name);

        DAOPermissionHandler.__Initialize_DAO_Permission(_dao);
    }

    function mint(address to, uint256 amount) external virtual;
}
