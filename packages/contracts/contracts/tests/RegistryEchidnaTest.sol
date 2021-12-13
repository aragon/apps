/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;
import "../src/registry/Registry.sol";
import "../src/DAO.sol";

contract RegistryEchidnaTest {
    Registry public registry;

    constructor() {
        registry = new Registry();
    }

    function echidna_register() external returns (bool) {
        string memory name = "hello";
        DAO dao = DAO(address(0x1));
        registry.register(name, dao);
        return registry.daos(name) == dao;
    }
}
