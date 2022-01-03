/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract ProcessFactory is AbstractFactory {
    function newProcess(uint256[3] calldata _processSettings) external returns (address process) {
        process = createProxy(votingBase, abi.encodeWithSelector(/** CONFIG */));
    }

    function setupBases() internal override {
        /**
            TBD: We probably go first with the hard coded voting process here. Later on the marketplace should help out.
        */
    }
}

