import { useSigner } from "use-signer"
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { Network } from "@ethersproject/networks";
import { useEnsName } from "./useEnsData";

export interface IUseWalletProps {
  provider: Web3Provider | null;
  signer: JsonRpcSigner | null;
  status: "disconnected" | "connecting" | "connected";
  address: string | null;
  chainId: number;
  balance: BigNumber | null
  ensAvatarUrl: string
  ensName: string
  isConnected: boolean
  networkName: string
  // equal value to address
  account: string | null;
  methods: {
    selectWallet: () => Promise<void>;
    refreshChainId: () => Promise<void>;
    disconnect: () => Promise<void>;
  };
}

export const useWallet = ():IUseWalletProps => {
  const { chainId, methods, signer, provider, address, status } = useSigner()
  const [balance, setBalance] = useState<BigNumber | null>(null)
  const [ensName, setEnsName] = useState<string>("")
  const [ensAvatarUrl, setEnsAvatarUrl] = useState<string>("")
  const [networkName, setNetworkName] = useState<string>("")
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // Update balance
  useEffect(() => {
    if (address && provider) {
      provider?.getBalance(address).then((balance: BigNumber) => {
        setBalance(balance)
      })
    }
  }, [provider, address])

  // Update ENS name and avatar
  useEffect(() => {
    if (provider && address) {
      provider?.lookupAddress(address).then((name: string | null) => {
        name ? setEnsName(name) : setEnsName('')
      })
      provider?.getAvatar(address).then((avatarUrl: string | null) => {
        avatarUrl ? setEnsAvatarUrl(avatarUrl) : setEnsAvatarUrl('')
      })
    }
  }, [address, provider])

  // update isConnected
  useEffect(() => {
    setIsConnected(status === 'connected')
  }, [status])

  // update networkName
  useEffect(() => {
    if (provider) {
      provider?.getNetwork().then((network: Network) => {
        setNetworkName(network.name)
      })
    }
  }, [provider, chainId])

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
    methods
  }
}
