import {isAddress, parseUnits} from 'ethers/lib/utils';
import {ValidateResult} from 'react-hook-form';
import {BigNumber, providers as EthersProviders} from 'ethers';

import {isERC20Token} from './tokens';

// TODO: Create error constants

/**
 * Validate given token contract address
 *
 * @param address token contract address
 * @param provider rpc provider
 * @returns true when valid, or an error message when invalid
 */
export async function validateToken(
  address: string,
  provider: EthersProviders.Provider
): Promise<ValidateResult> {
  const result = validateAddress(address);

  if (result === true) {
    return (await isERC20Token(address, provider))
      ? true
      : 'Token with given address is not ERC20 compliant';
  } else {
    return result;
  }
}

/**
 * Validate given token amount
 *
 * @param amount token amount
 * @param decimals token decimals
 * @returns true when valid, or an error message when invalid
 */
export function validateTokenAmount(
  amount: string,
  decimals: number,
  balance = '0'
) {
  // Amount has comma
  if (amount.includes(',')) return 'The amount must not be separated by commas';

  // A token with no decimals (they do exist in the wild)
  if (!decimals) {
    if (amount.includes('.')) {
      return "The token doesn't contain decimals. Please enter the exact amount";
    }
    return true;
  }

  // Amount has no decimal point or no value after decimal point
  if (!amount.includes('.') || amount.split('.')[1] === '')
    return 'Include decimals, e.g. 10.0';

  // Number of characters after decimal point greater than
  // the number of decimals in the token itself
  if (amount.split('.')[1].length > decimals)
    return `The number of decimals in the amount must not exceed the number of decimal of the token(${decimals})`;

  // Amount less than or equal to zero
  if (BigNumber.from(parseUnits(amount, decimals)).lte(0))
    return 'The amount must be greater than zero';

  // Amount is greater than wallet/dao balance
  if (BigNumber.from(parseUnits(amount, decimals)).gt(parseUnits(balance)))
    return 'Insufficient balance';

  return true;
}

/**
 * Validate given wallet address
 *
 * @param address address to be validated
 * @returns true if valid, error message if invalid
 */
export const validateAddress = (address: string): ValidateResult => {
  return isAddress(address) ? true : 'Invalid address';
};
