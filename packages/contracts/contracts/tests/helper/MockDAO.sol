/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;
import "../../src/permissions/Permissions.sol";

/// @title Mock the DAO contract and bypass permission checking for now
contract MockDAO {
    Permissions public permissions;

    function initialize(Permissions _permissions) public {
      permissions = _permissions;
    }

    function hasPermission(address, address, bytes32, bytes calldata) public pure returns(bool) {
      return true;
    }
}
