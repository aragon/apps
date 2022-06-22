import {constants} from 'ethers';
import {Interface, getAddress, hexZeroPad} from 'ethers/lib/utils';
import {Log} from '@ethersproject/providers';
import {useState, useEffect} from 'react';

import {erc20TokenABI} from 'abis/erc20TokenABI';
import {useWallet} from 'hooks/useWallet';
import {useProviders} from 'context/providers';
import {isNativeToken, fetchBalance, getTokenInfo} from 'utils/tokens';
import {TokenBalance, HookData} from 'utils/types';
import {useNetwork} from 'context/network';
import {CHAIN_METADATA} from 'utils/constants';

// TODO The two hooks in this file are very similar and should probably be
// merged into one. The reason I'm not doing it now is that I'm not sure if
// there is a situation where it makes sense have only the addresses. If that's
// not the case we should merge them. [VR 07-03-2022]

/**
 * Returns a list of token addresses for which the currently connected wallet
 * has balance.
 */
export function useUserTokenAddresses(): HookData<string[]> {
  const {address} = useWallet();
  const {web3} = useProviders();

  const [tokenList, setTokenList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    async function fetchTokenList() {
      setIsLoading(true);
      if (web3 && address) {
        try {
          const erc20Interface = new Interface(erc20TokenABI);
          const latestBlockNumber = await web3.getBlockNumber();

          // Get all transfers sent to the input address
          const transfers: Log[] = await web3.getLogs({
            fromBlock: 0,
            toBlock: latestBlockNumber,
            topics: [
              erc20Interface.getEventTopic('Transfer'),
              null,
              hexZeroPad(address as string, 32),
            ],
          });
          // Filter unique token contract addresses and convert all events to Contract instances
          const tokens = await Promise.all(
            transfers
              .filter(
                (event, i) =>
                  i ===
                  transfers.findIndex(other => event.address === other.address)
              )
              .map(event => getAddress(event.address))
          );
          setTokenList(tokens);
        } catch (error) {
          setError(new Error('Failed to fetch ENS name'));
          console.error(error);
        }
      } else {
        setTokenList([]);
      }
      setIsLoading(false);
    }

    fetchTokenList();
  }, [address, web3]);

  return {data: tokenList, isLoading, error};
}

/**
 * Returns a list of token balances for the currently connected wallet.
 *
 * This is hook is very similar to useUserTokenAddresses, but in addition to the
 * contract address it also returns the user's balance for each of the tokens.
 */
export function useWalletTokens(): HookData<TokenBalance[]> {
  const {address, balance} = useWallet();
  const {infura: provider} = useProviders();
  const {network} = useNetwork();
  const nativeCurrency = CHAIN_METADATA[network].nativeCurrency;

  const {
    data: tokenList,
    isLoading: tokenListLoading,
    error: tokenListError,
  } = useUserTokenAddresses();

  const [walletTokens, setWalletTokens] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  // fetch tokens and corresponding balance on wallet
  useEffect(() => {
    async function fetchWalletTokens() {
      setIsLoading(true);
      if (address === null || provider === null) {
        setWalletTokens([]);
        return;
      }

      if (
        !balance?.eq(-1) &&
        !balance?.isZero() &&
        tokenList.indexOf(constants.AddressZero) === -1
      )
        tokenList.unshift(constants.AddressZero);

      // get tokens balance from wallet
      const balances: [
        string,
        {
          id: string;
          name: string;
          symbol: string;
          decimals: number;
        }
      ][] = await Promise.all(
        tokenList.map(async tokenAddress => {
          if (isNativeToken(tokenAddress)) {
            return [
              balance ? balance.toString() : '',
              {
                id: constants.AddressZero,
                name: nativeCurrency.name,
                symbol: nativeCurrency.symbol,
                decimals: nativeCurrency.decimals,
              },
            ];
          }

          const promises = await Promise.all([
            fetchBalance(
              tokenAddress,
              address,
              provider,
              nativeCurrency,
              false
            ),
            getTokenInfo(tokenAddress, provider, nativeCurrency),
          ]);

          return [
            promises[0],
            {
              id: tokenAddress,
              ...promises[1],
            },
          ];
        })
      );

      // map tokens with their balance
      setWalletTokens(
        balances?.map(_balance => ({
          token: {
            id: _balance[1].id,
            name: _balance[1].name,
            symbol: _balance[1].symbol,
            decimals: _balance[1].decimals,
          },
          balance: BigInt(_balance[0]),
        }))
      );
      setIsLoading(false);
    }

    if (tokenListLoading) return;
    if (tokenListError) {
      setError(tokenListError);
      return;
    }
    fetchWalletTokens();
  }, [
    address,
    balance,
    tokenList,
    provider,
    tokenListLoading,
    tokenListError,
    nativeCurrency,
  ]);

  return {data: walletTokens, isLoading: tokenListLoading || isLoading, error};
}
