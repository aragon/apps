/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "./../registry/Registry.sol";
import "./../../core/DAO.sol";

contract DAOFactory is AbstractFactory {
    using Address for address;
    
    address private daoBase;

    Registry private registry;
    TokenFactory private tokenFactory;
    ProcessFactory private processFactory;

    struct DAOConfig {
        string name,
        bytes metadata,
        vaultConfig,
        processConfig,
        tokenConfig,
    }

    constructor(
        Registry _registry, 
        TokenFactory _tokenFactory, 
        ProcessFactory _processFactory
    ) {
        registry = _registry;
        tokenFactory = _tokenFactory;
        processFactory = _processFactory;
    }

    function newDAO(DAOConfig daoConfig) external returns (DAO dao) {
        // Create token or wrap token
        address token = tokenFactory.newToken(_tokenConfig);

        // Creates the DAO contract.
        DAO dao = DAO(createProxy(daoBase, bytes("")));
        dao.initialize(_metadata);

        // Create process and give permissions to call execute on DAO
        address process = processFactory.newProcess(_processSettings);
        dao.addProcess(process);

        registry.register(daoConfig.name, dao, msg.sender)
    }

    function setupBases() internal override {
        daoBase = address(new DAO());
    }
}

