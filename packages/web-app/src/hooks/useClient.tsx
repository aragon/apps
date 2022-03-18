import { Web3Provider } from "@ethersproject/providers"
import { ethers } from "ethers"
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useSigner } from "use-signer"
import { useCache } from "./useCache"
import { ClientDao, Context as SdkContext } from '@aragon/sdk-client'


interface Client {
  chainId: number
  chainName: string
  environment: string
}

interface ClientContext {
  client: ClientDao
}

const UseClientContext = createContext<ClientContext>({} as ClientContext)

export const useClient = () => {
  const ctx = useContext(UseClientContext)
  if (ctx === null) {
    throw new Error('useClient() can only be used on the descendants of <UseClientProvider />')
  }
  return ctx
}
export const UseClientProvider = ({ children }: { children: ReactNode }) => {
  const { provider, address, chainId } = useSigner()
  const [context, setContext] = useState(new SdkContext({
    network: 'mainnet',
    dao: "dao",
    daoFactoryAddress: "",
    signer: provider?.getSigner()
  }))
  const [client, setClient] = useState(new ClientDao(context))
    // useEffect(() => {
    //   provider?.getNetwork().then((network) => {
    //     setClient({ ...client, chainId, chainName: network.name })
    //   })
    // }, [chainId])
  const value = {
    client
  }
  return (
    <UseClientContext.Provider value={value}>
      {children}
    </UseClientContext.Provider>
  )
}
