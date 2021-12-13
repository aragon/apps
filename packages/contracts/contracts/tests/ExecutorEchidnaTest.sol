/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;
import "../src/executor/Executor.sol";
import "../src/vault/Vault.sol";


contract RegistryEchidnaTest {
    Executor public executor;
    Vault public vault;
    Executor.Action[] actions;

    constructor() {
      executor = new Executor();
      vault = new Vault();
    }

    function echidna_execute_with_zero_value() external returns (bool) {
      actions.push(Executor.Action(address(vault), 0, bytes("")));
      executor.execute(actions);
      return true;
    }
}
