/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./../../packages/tokens/GovernanceWrappedERC20.sol";
import "./../../packages/tokens/GovernanceERC20.sol";
import "./AbstractFactory.sol";

contract TokenFactory is AbstractFactory {
    address private governanceERC20Base;
    address private governanceWrappedERC20Base;

    struct TokenConfig {
        address addr;
        string name;
        string symbol;
    }

    function newToken(
        TokenConfig calldata _tokenConfig,
    ) external returns (address token) {
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
            GovernanceWrappedERC20(token).initialize(IERC20Upgradeable(_tokenConfig.addr), _tokenConfig.name, _tokenConfig.symbol);
        }
    }

    function setupBases() internal override {
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
    }
}

