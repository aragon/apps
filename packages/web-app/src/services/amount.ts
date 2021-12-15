import {Contract, providers as EthersProviders} from 'ethers';
import {erc20TokenABI} from 'utils/abis';
import {formatUnits} from 'utils/library';
import {getTokenInfo} from 'utils/tokens';
/**
 * validate that the asset balance of the owner is greater or equal to the amount
 * @param address address to be verified
 * @param ownerAddress owner address to be validated
 * @param provider interface to node
 * @returns  <ValidateResult> true if valid, error message if invalid
 */
export const FetchBalance = async (
  tokenAddress: string,
  ownerAddress: string,
  provider: EthersProviders.Provider
) => {
  const contract = new Contract(tokenAddress, erc20TokenABI, provider);
  const balance = await contract.balanceOf(ownerAddress);
  const {decimals} = await getTokenInfo(tokenAddress, provider);

  return formatUnits(balance, decimals);
};
