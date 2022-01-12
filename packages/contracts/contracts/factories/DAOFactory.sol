/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./../processes/votings/simple/SimpleVoting.sol";
import "./../tokens/GovernanceERC20.sol";
import "./../tokens/GovernanceWrappedERC20.sol";
import "./../core/processes/Process.sol";
import "./../registry/Registry.sol";
import "./../core/DAO.sol";

/// @title DAOFactory to create a DAO
/// @author Giorgi Lagidze & Samuel Furter - Aragon Association - 2022
/// @notice This contract is used to create a DAO.
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
        string calldata name,
        bytes calldata _metadata,
        TokenConfig calldata _tokenConfig,
        uint256[3] calldata _votingSettings
    ) external returns (DAO dao, SimpleVoting voting, address token) {
        // setup Token
        // TODO: Do we wanna leave the option not to use any proxy pattern in such case ? 
        // delegateCall is costly if so many calls are needed for a contract after the deployment.
        token = _tokenConfig.addr;
        // https://forum.openzeppelin.com/t/what-is-the-best-practice-for-initializing-a-clone-created-with-openzeppelin-contracts-proxy-clones-sol/16681
        if(token == address(0)) {
            token = Clones.clone(governanceERC20Base);
            GovernanceERC20(token).initialize(_tokenConfig.name, _tokenConfig.symbol);
        } else {
            token = Clones.clone(governanceWrappedERC20Base);
            // user already has a token. we need to wrap it in our new token to make it governance token.
            GovernanceWrappedERC20(
                token
            ).initialize(
                IERC20Upgradeable(_tokenConfig.addr),
                _tokenConfig.name,
                _tokenConfig.symbol
            );
        }

        dao = DAO(createProxy(daoBase, bytes("")));
        
        registry.register(name, dao, msg.sender);
        
        dao.initialize(
            _metadata,
            address(this)
        );

        voting = SimpleVoting(
            createProxy(
                votingBase,
                abi.encodeWithSelector(
                    SimpleVoting.initialize.selector,
                    dao,
                    token,
                    _votingSettings
                )
            )
        );

        // Grant factory DAO_CONFIG_ROLE to add a process
        dao.grant(address(dao), address(this), dao.DAO_CONFIG_ROLE());

        // Add voting process
        dao.addProcess(voting);

        // Grant DAO ROOT_ROLE on DAO
        dao.grant(address(dao), address(dao), dao.ROOT_ROLE());

        // Revoke DAO_CONFIG_ROLE and ROOT_ROLE from factory
        dao.revoke(address(dao), address(this), dao.ROOT_ROLE());
        dao.revoke(address(dao), address(this), dao.DAO_CONFIG_ROLE());
    }

    function createProxy(address _logic, bytes memory _data) private returns(address payable addr) {
        return payable(address(new ERC1967Proxy(_logic, _data)));
    }

    function setupBases() private {
        votingBase = address(new SimpleVoting());
        daoBase = address(new DAO());
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
    }
}