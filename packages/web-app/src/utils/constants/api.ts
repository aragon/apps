import {SupportedNetworks} from './chains';

type SubgraphNetworkUrl = Record<SupportedNetworks, string | undefined>;

// TODO: Replace with proper subgraph URL after future proof tasks have been performed
export const SUBGRAPH_API_URL: SubgraphNetworkUrl = {
  ethereum: undefined,
  rinkeby:
    'https://api.thegraph.com/subgraphs/name/rekard0/rekard0-zaragoza-rinkeby',
  // 'https://api.thegraph.com/subgraphs/name/aragon/aragon-zaragoza-rinkeby',
  polygon: undefined,
  mumbai:
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-zaragoza-mumbai',
  arbitrum: undefined,
  'arbitrum-test':
    'https://api.thegraph.com/subgraphs/name/aragon/aragon-zaragoza-arbitrum-rinkeby',
};

export const BASE_URL = 'https://api.coingecko.com/api/v3';
export const DEFAULT_CURRENCY = 'usd';
export const INFURA_PROJECT_ID = '7a03fcb37be7479da06f92c5117afd47';
export const INFURA_PROJECT_ID_ARB = '92aa62d2bb5449cfafe04b83ca8636f1';

// Coingecko Api specific asset platform keys
export const ASSET_PLATFORMS: Record<SupportedNetworks, string | null> = {
  arbitrum: 'arbitrum-one',
  'arbitrum-test': null,
  ethereum: 'ethereum',
  rinkeby: null,
  polygon: 'polygon-pos',
  mumbai: null,
};

// to be removed
export const TEST_DAO = '0xf1ce79a45615ce1d32af6422ed77b9b7ffc35c88';
