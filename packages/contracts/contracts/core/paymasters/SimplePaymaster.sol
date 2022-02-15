/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@opengsn/contracts/src/BasePaymaster.sol";

contract SimplePaymaster is BasePaymaster {

    function versionPaymaster() external override virtual view returns (string memory){
        return "2.2.3+opengsn.token.ipaymaster";
    }

    function preRelayedCall(
        GsnTypes.RelayRequest calldata /* relayRequest */,
        bytes calldata /* signature */,
        bytes calldata /* approvalData */,
        uint256 /* maxPossibleGas */
    )
    external
    override
    virtual
    relayHubOnly
    returns (bytes memory context, bool revertOnRecipientRevert) {
        return ("", false);
    }

    function postRelayedCall(
        bytes calldata /* context */,
        bool,
        uint256 /* gasUseWithoutPost */,
        GsnTypes.RelayData calldata /* relayData */
    )
    external
    override
    virtual
    relayHubOnly {
       
    }
}