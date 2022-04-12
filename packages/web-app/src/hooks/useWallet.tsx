import {useSigner, SignerValue} from 'use-signer';
import {useEffect, useState} from 'react';
import {BigNumber} from 'ethers';
import {Network} from '@ethersproject/networks';

export interface IUseWallet extends SignerValue {
  balance: BigNumber | null;
  ensAvatarUrl: string;
  ensName: string;
  isConnected: boolean;
  networkName: string;
  // equal value to address
  account: string | null;
}

export const useWallet = (): IUseWallet => {
  const {chainId, methods, signer, provider, address, status} = useSigner();
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [ensName, setEnsName] = useState<string>('');
  const [ensAvatarUrl, setEnsAvatarUrl] = useState<string>('');
  const [networkName, setNetworkName] = useState<string>('');
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

  // update networkName
  useEffect(() => {
    if (provider) {
      provider?.getNetwork().then((network: Network) => {
        setNetworkName(network.name);
      });
    }
  }, [provider, chainId]);

  return {
    provider,
    signer,
    status,
    address,
    account: address,
    chainId,
    balance,
    ensAvatarUrl,
    ensName,
    isConnected,
    networkName,
    methods,
  };
};
