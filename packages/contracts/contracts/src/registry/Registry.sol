/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.7.6;

contract Registry {
    event NewDAO(string indexed name, address indexed dao, address indexed creator);

    mapping(string => address) public daos;

    function register(string calldata name, address dao) external {
        require(daos[name] == address(0), "This name is already in use!");
        require(dao != address(0), "DAO address cannot be zero");

        daos[name] = dao;
        
        emit NewDAO(name, dao, msg.sender);
    }
}
