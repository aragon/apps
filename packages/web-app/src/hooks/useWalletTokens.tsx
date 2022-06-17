import {constants} from 'ethers';
import {Interface, getAddress, hexZeroPad} from 'ethers/lib/utils';
import {Log} from '@ethersproject/providers';
import {useState, useEffect} from 'react';

import {erc20TokenABI} from 'abis/erc20TokenABI';
import {useWallet} from 'hooks/useWallet';
import {useProviders} from 'context/providers';
import {isETH, fetchBalance, getTokenInfo} from 'utils/tokens';
import {TokenBalance, HookData} from 'utils/types';

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

      if (Number(balance) !== -1 && Number(balance) !== 0)
        tokenList.push(constants.AddressZero);

      // get tokens balance from wallet
      const balances: [
        string,
        {
          name: string;
          symbol: string;
          decimals: number;
        }
      ][] = await Promise.all(
        tokenList.map(address => {
          if (isETH(address)) {
            return [
              balance ? balance.toString() : '',
              {
                name: 'Ethereum (Canonical)',
                symbol: 'ETH',
                decimals: 18,
              },
            ];
          }

          return Promise.all([
            fetchBalance(address, address, provider, false),
            getTokenInfo(address, provider),
          ]);
        })
      );

      // map tokens with their balance
      setWalletTokens(
        tokenList?.map((token, index) => ({
          token: {
            id: token,
            name: balances[index][1].name,
            symbol: balances[index][1].symbol,
            decimals: balances[index][1].decimals,
          },
          balance: BigInt(balances[index][0]),
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
  }, [address, balance, tokenList, provider, tokenListLoading, tokenListError]);

  return {data: walletTokens, isLoading: tokenListLoading || isLoading, error};
}
