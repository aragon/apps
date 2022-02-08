import {
  DAO as DAOContract,
  SetMetadata,
  Executed,
  Deposited,
  ETHDeposited,
  Withdrawn
} from '../generated/templates/DAO/DAO';
import {GovernanceWrappedERC20} from '../generated/templates/DAO/GovernanceWrappedERC20';
import {
  Dao,
  VaultDeposit,
  VaultWithdraw,
  ERC20Token,
  ERC20Balance
} from '../generated/schema';
import {Address, BigInt} from '@graphprotocol/graph-ts';
import {ADDRESS_ZERO} from './utils/constants';

export function handleSetMetadata(event: SetMetadata): void {
  let id = event.address.toHexString();
  let entity = Dao.load(id);
  if (entity) {
    entity.metadata = event.params.metadata.toString();
    entity.save();
  }
}

export function handleExecuted(event: Executed): void {
  // TODO:
}

function updateERC20Balance(
  balanceId: string,
  token: Address,
  daoAddress: Address
): void {
  let daoId = daoAddress.toHexString();
  let entity = ERC20Balance.load(balanceId);

  if (!entity) {
    entity = new ERC20Balance(balanceId);
    entity.token = token.toHexString();
    entity.dao = daoId;
  }

  let tokenContract = GovernanceWrappedERC20.bind(token);
  let daoBalance = tokenContract.try_balanceOf(daoAddress);
  if (!daoBalance.reverted) {
    entity.balance = daoBalance.value;
  }
  entity.save();
}

function updateEthBalance(
  daoAddress: Address,
  amount: BigInt,
  isDeposit: bool
): void {
  let daoId = daoAddress.toHexString();
  let balanceId = daoId + '_' + ADDRESS_ZERO;
  let entity = ERC20Balance.load(balanceId);

  if (!entity) {
    entity = new ERC20Balance(balanceId);
    entity.token = ADDRESS_ZERO;
    entity.dao = daoId;
  }

  entity.balance = isDeposit
    ? entity.balance.plus(amount)
    : entity.balance.minus(amount);

  entity.save();
}

function handleERC20Token(token: Address): void {
  let entity = ERC20Token.load(token.toHexString());
  if (!entity) {
    entity = new ERC20Token(token.toHexString());
    if (token.toHexString() == ADDRESS_ZERO) {
      entity.name = 'Ethereum (Canonical)';
      entity.symbol = 'ETH';
      entity.decimals = BigInt.fromString('18');
      entity.save();
    } else {
      let tokenContract = GovernanceWrappedERC20.bind(token);
      let tokenName = tokenContract.try_name();
      let tokenSymbol = tokenContract.try_symbol();
      let tokenDecimals = tokenContract.try_decimals();
      if (
        !tokenName.reverted &&
        !tokenSymbol.reverted &&
        !tokenDecimals.reverted
      ) {
        entity.name = tokenName.value;
        entity.symbol = tokenSymbol.value;
        entity.decimals = BigInt.fromString(tokenDecimals.value.toString());
      }
      entity.save();
    }
  }
}

export function handleDeposited(event: Deposited): void {
  let daoId = event.address.toHexString();
  let depositId =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toHexString() +
    '_' +
    event.transactionLogIndex.toHexString();
  let token = event.params.token;
  let balanceId = daoId + '_' + token.toHexString();

  // handle token
  handleERC20Token(token);
  // update balance
  updateERC20Balance(balanceId, token, event.address);

  let entity = new VaultDeposit(depositId);
  entity.dao = daoId;
  entity.token = token;
  entity.sender = event.params.sender;
  entity.amount = event.params.amount;
  entity.reference = event.params._reference;
  entity.createdAt = event.block.timestamp;
  entity.save();
}

export function handleETHDeposited(event: ETHDeposited): void {
  let daoId = event.address.toHexString();
  let id =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toHexString() +
    '_' +
    event.transactionLogIndex.toHexString();

  let entity = new VaultDeposit(id);

  // handle token
  handleERC20Token(Address.fromString(ADDRESS_ZERO));
  // update Eth balance
  updateEthBalance(event.address, event.params.amount, true);

  entity.dao = daoId;
  entity.token = Address.fromString(ADDRESS_ZERO);
  entity.sender = event.params.sender;
  entity.amount = event.params.amount;
  entity.reference = 'Eth deposit';
  entity.createdAt = event.block.timestamp;
  entity.save();
}

export function handleWithdrawn(event: Withdrawn): void {
  let daoId = event.address.toHexString();
  let id =
    event.address.toHexString() +
    '_' +
    event.transaction.hash.toHexString() +
    '_' +
    event.transactionLogIndex.toHexString();

  let token = event.params.token;
  let entity = new VaultWithdraw(id);

  if (token.toHexString() == ADDRESS_ZERO) {
    // update Eth balance
    updateEthBalance(event.address, event.params.amount, false);
  } else {
    // update balance
    let balanceId = daoId + '_' + token.toHexString();
    updateERC20Balance(balanceId, token, event.address);
  }

  entity.dao = daoId;
  entity.token = token;
  entity.to = event.params.to;
  entity.amount = event.params.amount;
  entity.reference = event.params._reference;
  entity.createdAt = event.block.timestamp;
  entity.save();
}
