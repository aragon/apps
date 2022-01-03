/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

abstract contract AbstractFactory {
    constructor() {
        setupBases();
    }

    function createProxy(address _logic, bytes memory _data) private returns(address) {
        return address(new ERC1967Proxy(_logic, _data));
    }

    function _setupBases() internal virtual;
}

