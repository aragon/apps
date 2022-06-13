/* eslint-disable no-empty */
import {erc20TokenABI} from 'abis/erc20TokenABI';
import {TokenWithMetadata} from './types';
import {constants, ethers, providers as EthersProviders} from 'ethers';

import {formatUnits} from 'utils/library';
import {TOKEN_AMOUNT_REGEX} from './constants';

/**
 * This method sorts a list of array information. It is applicable to any field
 * of the information object that can be compared using '<', '>'.
 *
 * @param tokens List of token (basic) token information
 * @param criteria Field of the information object that determines the sort order.
 * @param reverse reverses the order in which the token are sorted. Note that in
 * either cases, any objects with undefined fields will moved to the end of the
 * array.
 *
 * @example sortTokens(baseTokenInfos[], 'name');
 * @example sortTokens(baseTokenInfos[], 'count');
 */
export function sortTokens<T>(tokens: T[], criteria: keyof T, reverse = false) {
  function sorter(a: T, b: T) {
    // ensure that undefined fields are placed last.
    if (!a[criteria]) return 1;
    if (!b[criteria]) return -1;

    if (a[criteria] < b[criteria]) {
      return reverse ? 1 : -1;
    }
    if (a[criteria] > b[criteria]) {
      return reverse ? -1 : 1;
    }
    return 0;
  }

  tokens.sort(sorter);
}

/**
 * This method filters a list of array information. It searches the searchTerm
 * in the tokens name, symbol and address.
 *
 * @param tokens List of (basic) token information
 * @param searchTerm Term to search for in information
 * @returns Filtered list of (basic) token information that contains search
 * term.
 */
export function filterTokens(tokens: TokenWithMetadata[], searchTerm: string) {
  function tokenInfoMatches(token: TokenWithMetadata, term: string) {
    const lowercaseTerm = term.toLocaleLowerCase();
    const lowercaseSymbol = token.metadata.symbol.toLocaleLowerCase();
    const lowercaseAddress = token.metadata.id.toLocaleLowerCase();
    const lowercaseName = token.metadata.name.toLocaleLowerCase();
    return (
      lowercaseSymbol.indexOf(lowercaseTerm) >= 0 ||
      lowercaseName.indexOf(lowercaseTerm) >= 0 ||
      lowercaseAddress.indexOf(lowercaseTerm) >= 0
    );
  }

  if (!searchTerm) return tokens;

  return tokens.filter(t => tokenInfoMatches(t, searchTerm));
}

/**
 * This Validation function prevents sending broken
 * addresses that may cause subgraph crash
 *
 * @param address Wallet Address
 * @param provider Eth provider
 * @returns boolean determines whether it is erc20 compatible or not
 */

export async function isERC20Token(
  address: string,
  provider: EthersProviders.Provider
) {
  const contract = new ethers.Contract(address, erc20TokenABI, provider);
  try {
    await Promise.all([contract.balanceOf(address), contract.totalSupply()]);
    return true;
  } catch (err) {
    return false;
  }
}
/**
 * This Function is necessary because
 * you can't fetch decimals from the api
 *
 * @param address token contract address
 * @param provider Eth provider
 * @returns number for decimals for each token
 */
export async function getTokenInfo(
  address: string,
  provider: EthersProviders.Provider
) {
  let decimals = null,
    symbol = null,
    name = null,
    totalSupply = null;

  if (isETH(address)) {
    return {
      name: 'Ethereum',
      symbol: constants.EtherSymbol,
      decimals: 18,
      totalSupply,
    };
  }

  const contract = new ethers.Contract(address, erc20TokenABI, provider);
  try {
    const values = await Promise.all([
      contract.decimals(),
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
    ]);

    decimals = values[0];
    name = values[1];
    symbol = values[2];
    totalSupply = values[3];
  } catch (error) {
    console.error('Error, getting token info from contract');
  }

  return {
    decimals,
    name,
    symbol,
    totalSupply,
  };
}

/**
 * @param tokenAddress address of token contract
 * @param ownerAddress owner address / wallet address
 * @param provider interface to node
 * @param shouldFormat whether value is returned in human readable format
 * @returns a promise that will return a balance amount
 */
export const fetchBalance = async (
  tokenAddress: string,
  ownerAddress: string,
  provider: EthersProviders.Provider,
  shouldFormat = true
) => {
  const contract = new ethers.Contract(tokenAddress, erc20TokenABI, provider);
  const balance = await contract.balanceOf(ownerAddress);

  if (shouldFormat) {
    const {decimals} = await getTokenInfo(tokenAddress, provider);
    return formatUnits(balance, decimals);
  }

  return balance;
};

/**
 * Check if token is Ether; the distinction is made
 * especially in terms of whether the contract address
 * is that of an ERC20 token
 * @param tokenAddress address of token contract
 * @returns whether token is Ether
 */
export const isETH = (tokenAddress: string) => {
  return tokenAddress === constants.AddressZero;
};

/**
 * Helper-method converts a string of tokens into a abbreviated version.
 *
 * @param amount [string] token amount. May include token symbol.
 * @returns [string] abbreviated token amount. Any decimal digits get discarded. For
 * thousands, millions and billions letters are used. E.g. 10'123'456.78 SYM becomes 10M.
 * Everything greater gets expressed as power of tens.
 */
export function abbreviateTokenAmount(amount: string): string {
  if (!amount) return 'N/A';

  const regexp_res = amount.match(TOKEN_AMOUNT_REGEX);
  // discard failed matches
  if (
    !regexp_res?.length ||
    regexp_res[0].length !== amount.length ||
    regexp_res.length !== 4
  )
    return 'N/A';

  const lead = regexp_res[1];
  const body = regexp_res[2];
  const symbol = regexp_res[3];

  // < 1000
  if (body?.length === 0) return lead + ' ' + symbol;
  const magnitude = body.length / 4;
  const magnitude_letter = ['K', 'M', 'B'];

  let abbreviation: string;
  if (magnitude <= 3) {
    // < trillion. Use respective letter.
    abbreviation = magnitude_letter[magnitude - 1];
  } else {
    // > trillion. Use power of tens notation.
    abbreviation = '*10^' + magnitude * 3;
  }

  return lead + abbreviation + ' ' + symbol;
}
