/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";

import "../tokens/GovernanceERC20.sol";
import "../tokens/GovernanceWrappedERC20.sol";
import "../tokens/MerkleDistributor.sol";
import "../tokens/MerkleMinter.sol";

import "../core/DAO.sol";
import "../tokens/MerkleDistributor.sol";

/// @title TokenFactory to create a DAO
/// @author Giorgi Lagidze - Aragon Association - 2022
/// @notice This contract is used to create a Token.
contract TokenFactory {
    using Address for address;
    using Clones for address;

    address private governanceERC20Base;
    address private governanceWrappedERC20Base;
    address private merkleMinterBase;

    MerkleDistributor private distributorBase;

    struct TokenConfig {
        address addr;
        string name;
        string symbol;
    }

    struct MintConfig {
        address[] tos;
        uint256[] amounts;
    }

    event DAOCreated(string name, address indexed token, address indexed voting);

    constructor() {
        setupBases();
    }

    // TODO: Worth considering the decimals ? 
    // @notice Creates or Wraps Token based with its name and symbol.
    // @param _dao The dao address
    // @param _metadata The IPFS hash pointing to the metadata JSON object of the DAO
    // @param _tokenConfig The address of the token, name, and symbol. If no addr is passed will a new token get created.
    // @return _mintConfig Where to mint initial tokens
    // @return ERC20VotesUpgradeable Created or Wrapped Token
    // @return MerkleMinter Merkle Minter 
    function newToken(
        DAO _dao,
        TokenConfig calldata _tokenConfig,
        MintConfig calldata _mintConfig
    ) external returns (ERC20VotesUpgradeable, MerkleMinter) {
        address token = _tokenConfig.addr;

        // deploy token
        if(token != address(0)) {
            token = governanceWrappedERC20Base.clone();
            // user already has a token. we need to wrap it in our new 
            // token to make it governance token.
            GovernanceWrappedERC20(token).initialize(
                IERC20Upgradeable(_tokenConfig.addr),
                _tokenConfig.name,
                _tokenConfig.symbol
            );

            return (
                ERC20VotesUpgradeable(token), 
                MerkleMinter(address(0))
            );
        }

        // IMPORTANT: If creator already has a token, It's that token's
        // responsibility to handle minting(if it exists on it)
        token = governanceERC20Base.clone();
        GovernanceERC20(token).initialize(
            _dao, 
            _tokenConfig.name, 
            _tokenConfig.symbol
        );

        // deploy and initialize minter
        address merkleMinter = merkleMinterBase.clone();
        MerkleMinter(merkleMinter).initialize(
            _dao,
            GovernanceERC20(token),
            distributorBase
        );

        bytes32 tokenMinterRole  = GovernanceERC20(token).TOKEN_MINTER_ROLE();
        bytes32 merkleMinterRole = MerkleMinter(merkleMinter).MERKLE_MINTER_ROLE();

        // give tokenFactory the permission to mint.
        _dao.grant(token, address(this), tokenMinterRole);

        for(uint i = 0; i < _mintConfig.tos.length; i++) {
            GovernanceERC20(token).mint(
                _mintConfig.tos[i], 
                _mintConfig.amounts[i]
            );
        }
        // remove the mint permission from tokenFactory
        _dao.revoke(token, address(this), tokenMinterRole);

        _dao.grant(token, address(_dao), tokenMinterRole);
        _dao.grant(token, merkleMinter, tokenMinterRole);
        _dao.grant(merkleMinter, address(_dao), merkleMinterRole);
        
        return (
            ERC20VotesUpgradeable(token), 
            MerkleMinter(merkleMinter)
        );
    }
    
    // @dev private helper method to set up the required base contracts on TokenFactory deployment.
    function setupBases() private {
        distributorBase = new MerkleDistributor();
        governanceERC20Base = address(new GovernanceERC20());
        governanceWrappedERC20Base = address(new GovernanceWrappedERC20());
        merkleMinterBase = address(new MerkleMinter());
    }
}


