/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.7.6;

import '../src/registry/Registry.sol';

contract RegistryEchidnaTest {
  string constant DAO_NAME = "test";
  address constant DAO_ADDRESS = address(1);
  Registry public registry;

  constructor() {
    registry = new Registry();
    registry.register(DAO_NAME, DAO_ADDRESS);
  }

  function echidna_address() external view returns (bool) {
    return registry.daos(DAO_NAME) == DAO_ADDRESS;
  }
}