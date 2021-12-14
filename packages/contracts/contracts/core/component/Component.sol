/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./../DAO.sol";

abstract contract Component is Initializable {
    DAO internal dao;
    
    modifier auth(bytes32 role)  {
        require(dao.willPerform(address(this), msg.sender, role, msg.data), "auth: check");
        _;
    }

    function initialize(DAO _dao) public virtual {
        dao = _dao;
    }
}
