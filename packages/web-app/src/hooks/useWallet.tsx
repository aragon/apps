import {useSigner, SignerValue} from 'use-signer';
import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';

export interface IUseWallet extends SignerValue {
  balance: BigNumber | null;
  ensAvatarUrl: string;
  ensName: string;
  isConnected: boolean;
}

export const useWallet = (): IUseWallet => {
  const {chainId, methods, signer, provider, address, status} = useSigner();
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [ensName, setEnsName] = useState<string>('');
  const [ensAvatarUrl, setEnsAvatarUrl] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Update balance
  useEffect(() => {
    if (address && provider) {
      provider?.getBalance(address).then((newBalance: BigNumber) => {
        setBalance(newBalance);
      });
    }
  }, [provider, address]);

  // Update ENS name and avatar
  useEffect(() => {
    if (provider && address) {
      provider?.lookupAddress(address).then((name: string | null) => {
        name ? setEnsName(name) : setEnsName('');
      });
      provider?.getAvatar(address).then((avatarUrl: string | null) => {
        avatarUrl ? setEnsAvatarUrl(avatarUrl) : setEnsAvatarUrl('');
      });
    }
  }, [address, provider]);

  // update isConnected
  useEffect(() => {
    setIsConnected(status === 'connected');
  }, [status]);

  return {
    provider,
    signer,
    status,
    address,
    chainId,
    balance,
    ensAvatarUrl,
    ensName,
    isConnected,
    methods,
  };
};
