import {Contract, BigNumber, providers} from 'ethers';
import {erc20TokenABI} from 'utils/abis';
/**
 * validate that the asset balance of the owner is greater or equal to the amount
 * @param address address to be verified
 * @param ownerAddress owner address to be validated
 * @param provider interface to node
 * @returns  <ValidateResult> true if valid, error message if invalid
 */
export const FetchBalance = async (
  address: string,
  ownerAddress: string,
  provider: providers.Web3Provider
) => {
  let balance = BigNumber.from(0);
  const contract = new Contract(address, erc20TokenABI, provider);
  balance = await contract.balanceOf(ownerAddress);

  return balance;
};
