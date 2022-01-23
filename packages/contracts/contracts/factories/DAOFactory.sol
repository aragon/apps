/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./../processes/votings/simple/SimpleVoting.sol";
import "./../tokens/GovernanceERC20.sol";
import "./../tokens/GovernanceWrappedERC20.sol";
import "./../core/processes/Process.sol";
import "./../registry/Registry.sol";
import "./../core/DAO.sol";

import "../utils/Proxy.sol";
import "../tokens/MerkleMinter.sol";
import "./TokenFactory.sol";

/// @title DAOFactory to create a DAO
/// @author Giorgi Lagidze & Samuel Furter - Aragon Association - 2022
/// @notice This contract is used to create a DAO.
contract DAOFactory {
    using Address for address;
    using Clones for address;
    
    string private constant ERROR_MISMATCH = "FACTORY: MISMATCH";

    address private votingBase;
    address private daoBase;
    address private governanceERC20Base;
    address private governanceWrappedERC20Base;

    Registry public registry;
    TokenFactory public tokenFactory;
    
    struct DAOConfig {
        string name;
        bytes metadata;
    }

    struct AllowedActions {
        bytes[] SimpleVoting;
    }

    event DAOCreated(string name, address indexed token, address indexed voting);

    // @dev Stores the registry address and creates the base contracts required for the factory
    // @param _registry The DAO registry to register the DAO with his name
    constructor(
        Registry _registry,
        TokenFactory _tokenFactory
    ) {
        registry = _registry;
        tokenFactory = _tokenFactory;

        setupBases();
    }

    // @notice Creates a new DAO based with his name, token, metadata, and the voting settings.
    // @param name The DAO name as string
    // @param _metadata The IPFS hash pointing to the metadata JSON object of the DAO
    // @param _tokenConfig The address of the token, name, and symbol. If no addr is passed will a new token get created.
    // @return dao The DAO contract created
    // @return voting The voting process for this DAO - Currently a hard-coded process. With the planned marketplace will this be more dynamic.
    // @return token The token passed or created that belongs to this DAO. - Probably not a requirement in the future.
    function newDAO(
        DAOConfig calldata _daoConfig,
        TokenFactory.TokenConfig calldata _tokenConfig,
        TokenFactory.MintConfig calldata _mintConfig,
        uint256[3] calldata _votingSettings,
        AllowedActions calldata _allowedActions
    ) external returns (
        DAO dao, 
        SimpleVoting voting, 
        ERC20VotesUpgradeable token,
        MerkleMinter minter
    ) {
        require(_mintConfig.tos.length == _mintConfig.amounts.length, ERROR_MISMATCH);
        
        // create dao
        dao = DAO(createProxy(daoBase, bytes("")));
        // initialize dao
        dao.initialize(_daoConfig.metadata, address(this));  

        // Create token and merkle minter
        dao.grant(address(dao), address(tokenFactory), dao.ROOT_ROLE());
        (token, minter) = tokenFactory.newToken(
            dao,
            _tokenConfig,
            _mintConfig
        );
        dao.revoke(address(dao), address(tokenFactory), dao.ROOT_ROLE());

        // register dao with its name and token to the registry
        // TODO: shall we add minter as well ? 
        registry.register(_daoConfig.name, dao, msg.sender, address(token));
        
        // create voting and initialize right away.
        voting = SimpleVoting(
            createProxy(
                votingBase,
                abi.encodeWithSelector(
                    SimpleVoting.initialize.selector,
                    dao,
                    token,
                    _votingSettings,
                    _allowedActions.SimpleVoting // TODO: maybe we can directly pass allowed actions here
                )
            )
        );

        // Grant factory DAO_CONFIG_ROLE to add a process
        dao.grant(address(dao), address(this), dao.DAO_CONFIG_ROLE());

        // Add voting process
        dao.addProcess(voting);

        // set roles on the Voting Process
        ACLData.BulkItem[] memory items = new ACLData.BulkItem[](4);

        address ANY_ADDR = address(type(uint160).max);
        
        items[0] = ACLData.BulkItem(ACLData.BulkOp.Grant, voting.PROCESS_VOTE_ROLE(), ANY_ADDR);
        items[1] = ACLData.BulkItem(ACLData.BulkOp.Grant, voting.PROCESS_EXECUTE_ROLE(), ANY_ADDR);
        items[2] = ACLData.BulkItem(ACLData.BulkOp.Grant, voting.PROCESS_START_ROLE(), ANY_ADDR);
        items[3] = ACLData.BulkItem(ACLData.BulkOp.Grant, voting.MODIFY_CONFIG(), address(dao));

        dao.bulk(address(voting), items);

        // set roles on the dao itself.
        items = new ACLData.BulkItem[](7);
        
        // Grant DAO all the permissions required
        items[0] = ACLData.BulkItem(ACLData.BulkOp.Grant, dao.DAO_CONFIG_ROLE(), address(dao));
        items[1] = ACLData.BulkItem(ACLData.BulkOp.Grant, dao.WITHDRAW_ROLE(), address(dao));
        items[2] = ACLData.BulkItem(ACLData.BulkOp.Grant, dao.UPGRADE_ROLE(), address(dao));
        items[3] = ACLData.BulkItem(ACLData.BulkOp.Grant, dao.ROOT_ROLE(), address(dao));
        items[4] = ACLData.BulkItem(ACLData.BulkOp.Grant, dao.SET_SIGNATURE_VALIDATOR_ROLE(), address(dao));

        // Revoke permissions from factory
        items[5] = ACLData.BulkItem(ACLData.BulkOp.Revoke, dao.DAO_CONFIG_ROLE(), address(this));
        items[6] = ACLData.BulkItem(ACLData.BulkOp.Revoke, dao.ROOT_ROLE(), address(this));

        dao.bulk(address(dao), items);
    
        emit DAOCreated(_daoConfig.name, address(token), address(voting));
    }
    
    // @dev Internal helper method to set up the required base contracts on DAOFactory deployment.
    function setupBases() private {
        votingBase = address(new SimpleVoting());
        daoBase = address(new DAO());
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
    }
}
