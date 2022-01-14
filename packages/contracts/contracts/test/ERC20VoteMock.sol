/*
 * SPDX-License-Identifier:    GPL-3.0
 */

pragma solidity 0.8.10;

contract ERC20VoteMock {

    mapping(uint256 => uint256) public totalSupply;
    mapping(address => mapping(uint256 => uint256)) public pastVotes;
    
    function setSupplyOnBlockNumber(uint256 blockNumber, uint256 supply) public {
        totalSupply[blockNumber] = supply;
    }

    function setPastVotesOnAccount(address account, uint256 blockNumber, uint256 supply) public {
        pastVotes[account][blockNumber] = supply;
    }

    function getPastTotalSupply(uint256 blockNumber) public view returns(uint256) {
        return totalSupply[blockNumber];
    }

    function getPastVotes(address account, uint256 blockNumber) public view returns (uint256) {
        return pastVotes[account][blockNumber];
    }

}
