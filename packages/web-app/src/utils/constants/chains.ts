/* SUPPORTED NETWORK TYPES ================================================== */

const SUPPORTED_CHAIN_ID = [1, 4, 137, 80001, 42161, 421611] as const;
export type SupportedChainID = typeof SUPPORTED_CHAIN_ID[number];

export function isSupportedChainId(
  chainId: number
): chainId is SupportedChainID {
  return SUPPORTED_CHAIN_ID.some(id => id === chainId);
}

const SUPPORTED_NETWORKS = [
  'ethereum',
  'rinkeby',
  'polygon',
  'mumbai',
  'arbitrum',
  'arbitrum-test',
] as const;
export type SupportedNetworks = typeof SUPPORTED_NETWORKS[number];

export function isSupportedNetwork(
  network: string
): network is SupportedNetworks {
  return SUPPORTED_NETWORKS.some(n => n === network);
}

export type NetworkDomain = 'L1 Blockchain' | 'L2 Blockchain';

/* CHAIN DATA =============================================================== */

export type ChainData = {
  id: SupportedChainID;
  name: string;
  domain: NetworkDomain;
  testnet: boolean;
  logo: string;
};

export type ChainList = Record<SupportedNetworks, ChainData>;
export const CHAIN_METADATA: ChainList = {
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    domain: 'L2 Blockchain',
    logo: 'https://bridge.arbitrum.io/logo.png',
    testnet: false,
  },
  ethereum: {
    id: 1,
    name: 'Ethereum',
    domain: 'L1 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    testnet: false,
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    domain: 'L2 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    testnet: false,
  },
  'arbitrum-test': {
    id: 421611,
    name: 'Arbitrum Rinkeby',
    domain: 'L2 Blockchain',
    logo: 'https://bridge.arbitrum.io/logo.png',
    testnet: true,
  },
  rinkeby: {
    id: 4,
    name: 'Rinkeby',
    domain: 'L1 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    testnet: true,
  },
  mumbai: {
    id: 80001,
    name: 'Mumbai',
    domain: 'L2 Blockchain',
    logo: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    testnet: true,
  },
};
