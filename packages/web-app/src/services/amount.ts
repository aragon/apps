import {Contract, providers as EthersProviders} from 'ethers';
import {erc20TokenABI} from 'abis/erc20TokenABI';
import {formatUnits} from 'utils/library';
import {getTokenInfo} from 'utils/tokens';

/**
 * @param tokenAddress address of token contract
 * @param ownerAddress owner address / wallet address
 * @param provider interface to node
 * @returns a promise that will return a balance amount
 */
export const fetchBalance = async (
  tokenAddress: string,
  ownerAddress: string,
  provider: EthersProviders.Provider
) => {
  const contract = new Contract(tokenAddress, erc20TokenABI, provider);
  const balance = await contract.balanceOf(ownerAddress);
  const {decimals} = await getTokenInfo(tokenAddress, provider);

  return formatUnits(balance, decimals);
};
