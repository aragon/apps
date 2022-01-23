/*
 * SPDX-License-Identifier:    MIT
 */

pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../core/IDAO.sol";
import "./GovernanceToken.sol";

contract GovernanceERC20 is Initializable, GovernanceToken {

    function initialize(
        IDAO _dao, 
        string calldata _name, 
        string calldata _symbol
    ) external initializer {
        __Initialize_Token(_dao, _name, _symbol);
    }

    function mint(address to, uint256 amount) external override auth(TOKEN_MINTER_ROLE) {
        _mint(to, amount);
    }

    // TODO: https://forum.openzeppelin.com/t/self-delegation-in-erc20votes/17501/12?u=novaknole
    function delegates(address account) public view virtual override returns (address) {
        return account;
    }

    // The functions below are overrides required by Solidity.
    function _afterTokenTransfer(address from, address to, uint256 amount) internal override {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override{
        super._burn(account, amount);
    }

}
