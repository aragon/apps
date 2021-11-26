/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "../../src/DAO.sol";

/// @title Abstract implementation of the permission validator
/// @author Samuel Furter - Aragon Association - 2021
/// @notice This contract can be used to implement concrete permission validators and being fully compatible with the DAO framework and UI of Aragon
/// @dev You only have to define the specific custom logic for your needs in isValid
abstract contract PermissionValidator is UUPSUpgradeable, Initializable {
      DAO private dao;

      /// @dev Used for UUPS upgradability pattern
      /// @param _dao The DAO contract of the current DAO
      function initialize(DAO _dao) public initializer {
            dao = _dao;
      }

      /// @dev Used for UUPS upgradability pattern
      /// @param _executor The executor that can update this contract
      function _authorizeUpgrade(address _executor) internal view override {
            require(dao.executor.address == _executor, "Only executor can call this!");
      }

      /// @notice The method to validate a user permission.
      /// @dev The state of the container does get changed to RUNNING, the execution struct gets created, and the concrete implementation in _start called.
      /// @param caler The caler of this contract
      /// @return valid Returns a bool depending on the validity of the permission
      function isValid(address caler) external virtual returns(bool valid);
}
