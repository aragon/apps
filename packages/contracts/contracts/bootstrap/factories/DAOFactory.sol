/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./../../packages/processes/votings/simple/SimpleVoting.sol";
import "./../../packages/tokens/GovernanceERC20.sol";
import "./../../packages/tokens/GovernanceWrappedERC20.sol";
import "./../../core/processes/Process.sol";
import "./../registry/Registry.sol";
import "./../../core/DAO.sol";

contract DAOFactory {
    using Address for address;
    
    
    address private votingBase;
    address private daoBase;
    address private governanceERC20Base;
    address private governanceWrappedERC20Base;

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
        bytes calldata _metadata,
        TokenConfig calldata _tokenConfig,
        uint256[3] calldata _votingSettings
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

        DAO dao = DAO(createProxy(daoBase, bytes("")));
        Process voting = createProxy(votingBase, abi.encodeWithSelector(Process.initialize.selector, dao, token, _votingSettings));
        
        dao.initialize(
            _metadata,
            voting
        );
    }

    function createProxy(address _logic, bytes memory _data) private returns(address) {
        return address(new ERC1967Proxy(_logic, _data));
    }

    function setupBases() private {
        votingBase = address(new SimpleVoting());
        daoBase = address(new DAO());
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
    }
}