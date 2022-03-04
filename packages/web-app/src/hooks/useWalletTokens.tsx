import {useState, useEffect} from 'react';
import {constants} from 'ethers';
import {formatUnits} from 'ethers/lib/utils';

import {isETH, fetchBalance} from 'utils/tokens';
import {useWallet} from 'context/augmentedWallet';
import {useWalletProps} from 'containers/walletMenu';
import {HookData, TokenBalance} from 'utils/types';
import {useProviders, useWalletTokensList} from 'context/providers';

export function useWalletTokens(): HookData<TokenBalance[]> {
  const {account, balance}: useWalletProps = useWallet();
  const {infura: provider} = useProviders();
  const {
    data: tokenList,
    isLoading: tokenListLoading,
    error: tokenListError,
  } = useWalletTokensList();

  const [walletTokens, setWalletTokens] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  // fetch tokens and corresponding balance on wallet
  useEffect(() => {
    async function fetchWalletTokens() {
      setIsLoading(true);
      if (account === null || provider === null) {
        setWalletTokens([]);
        return;
      }

      if (Number(balance) !== -1 && Number(balance) !== 0)
        await tokenList.push(constants.AddressZero);

      // get tokens balance from wallet
      const balances = await Promise.all(
        tokenList.map(address => {
          if (isETH(address)) return formatUnits(balance, 18)?.slice(0, 4);
          else return fetchBalance(address, account, provider, false);
        })
      );

      // map tokens with their balance
      setWalletTokens(
        tokenList?.map((token, index) => ({
          address: token,
          count: balances[index],
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
  }, [account, balance, tokenList, provider, tokenListLoading, tokenListError]);

  return {data: walletTokens, isLoading: tokenListLoading || isLoading, error};
}
