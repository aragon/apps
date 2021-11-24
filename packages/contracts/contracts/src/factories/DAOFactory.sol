/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "../DAO.sol";
import "../vault/Vault.sol";
import "../governance-primitives/voting/SimpleVoting.sol";
import "../tokens/GovernanceERC20.sol";
import "../tokens/GovernanceWrappedERC20.sol";
import "../registry/Registry.sol";
import "../processes/Processes.sol";
// import "../../lib/acl/ACL.sol";

contract DAOFactory {

    address private votingBase;
    address private vaultBase;
    address private daoBase;
    address private governanceERC20Base;
    address private governanceWrappedERC20Base;
    address private processesBase;

    Registry private registry;

    struct TokenConfig {
        address addr;
        string name;
        string symbol;
    }

    constructor(Registry _registry) {
        registry = _registry;
        setupBases();
    }

    function newDAO(
        TokenConfig calldata _tokenConfig,
        uint256[3] calldata _votingSettings,
        uint256[3] calldata _vaultSettings
    ) external {
        // setup Token
        // TODO: Do we wanna leave the option not to use any proxy pattern in such case ? 
        // delegateCall is costly if so many calls are needed for a contract after the deployment.
        address token = _tokenConfig.addr;
        // https://forum.openzeppelin.com/t/what-is-the-best-practice-for-initializing-a-clone-created-with-openzeppelin-contracts-proxy-clones-sol/16681
        if(token == address(0)) {
            token = Clones.clone(governanceERC20Base);
            GovernanceERC20(token).initialize(_tokenConfig.name, _tokenConfig.symbol);
        } else {
            token = Clones.clone(governanceWrappedERC20Base);
            // user already has a token. we need to wrap it in our new token to make it governance token.
            GovernanceWrappedERC20(token).initialize(IERC20Upgradeable(_tokenConfig.addr), _tokenConfig.name, _tokenConfig.symbol);
        }

        ERC1967Proxy dao = new ERC1967Proxy(daoBase, abi.encodeWithSelector(DAO.initialize.selector));    
        ERC1967Proxy voting = new ERC1967Proxy(votingBase, abi.encodeWithSelector(SimpleVoting.initialize.selector, dao, token, _votingSettings));
        ERC1967Proxy vault = new ERC1967Proxy(vaultBase, abi.encodeWithSelector(Vault.initialize.selector, dao, _vaultSettings));
        ERC1967Proxy processes = new ERC1967Proxy(processesBase, abi.encodeWithSelector(Processes.initialize.selector, dao));

        // permissions
        // ACLData.BulkItem[] memory items = new ACLData.BulkItem[](4);

        // items[0] = ACLData.BulkItem(ACLData.BulkOp.Grant, Processes.start.selector, address(dao));

        // Processes.bulk(items);        

    }

    function setupBases() private {
        votingBase = address(new SimpleVoting());
        vaultBase = address(new Vault());
        daoBase = address(new DAO());
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
        processesBase = address(new Processes());
    }
}

