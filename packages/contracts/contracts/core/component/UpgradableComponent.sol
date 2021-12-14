/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Component.sol";

abstract contract UpgradableComponent is Component, UUPSUpgradeable {
    bytes32 public constant UPGRADE_ROLE = keccak256("UPGRADE_ROLE");

    function _authorizeUpgrade(address) internal virtual override auth(UPGRADE_ROLE) { }
}
