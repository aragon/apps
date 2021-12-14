/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../../lib/permissions/PermissionValidator.sol";
import "../../lib/component/IDAO.sol";
import "../../lib/component/UpgradableComponent.sol";

/// @title The permissions contract responsible to handle all the governance process related permissions.
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract is a central point of the Aragon DAO framework and handles all the permissions and stores the different groups a DAO can have.
contract Permissions is UpgradableComponent {
    bytes32 public constant PERMISSIONS_SET_ROLE = keccak256("PERMISSIONS_SET_ROLE");

    event RoleSet(string indexed role, PermissionValidator indexed validator);

    // The different permissions to define depending on the type of governance primitive
    struct GovernancePrimitivePermissions {
        string start;
        string execute;
        string halt;
        string forward;
        string stop;
        string vote;
    }

    mapping(string => PermissionValidator) public permissions;

    constructor() initializer {}

    /// @dev Used for UUPS upgradability pattern
    /// @param _dao The DAO contract of the current DAO
    function initialize(IDAO _dao) public override initializer {
        Component.initialize(_dao);
    }

    /// @notice Adds a new role based on the permission validations passed.
    /// @dev Here you simple pass the role name and the permission struct with his logical operator and the validators set.
    /// @param role The name of the role as string
    /// @param permission The permission struct to define the permission validation rules
    function setRole(string calldata role, PermissionValidator calldata validator) external authP(PERMISSIONS_SET_ROLE) {
        permissions[role] = permission;

        emit RoleSet(role, permission);
    }

    /// @notice Checks the permissions of the caller.
    /// @dev Based on the stored permission struct does it go through all validators and checks the validity of the caller.
    /// @param role The name of the role as string
    /// @return valid The validity check result returned as bool
    function checkPermission(string calldata role, address calldata caller) external view returns (bool valid) {
        return PermissionValidator(permissions[role].validator).isValid(caller);
    }
}
