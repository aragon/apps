/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../core/component/Component.sol";
import "../core/acl/IACLOracle.sol";

abstract contract DAOPermissionHandler {
    
    IDAO internal dao;

    modifier auth(bytes32 _role)  {
        require(dao.hasPermission(address(this), msg.sender, _role, msg.data), "component: auth");
        _;
    }

    function __Initialize_DAO_Permission(IDAO _dao) internal {
        dao = _dao;
    }
}
