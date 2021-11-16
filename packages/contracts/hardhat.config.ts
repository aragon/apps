import * as dotenv from 'dotenv';

import {HardhatUserConfig, task} from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@aragon/hardhat-aragon';

const {homedir} = require('os');
const {join} = require('path');

// get the network url and account private key from ~/.aragon/network_key.json
function getNetworkConfig(network: string): any {
  let url = '';
  let accounts = [];

  try {
    const networkConfig = require(join(
      homedir(),
      `.aragon/${network}_key.json`
    ));
    url = networkConfig.rpc;
    accounts = networkConfig.keys;
  } catch (_) {}

  return {url, accounts};
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000,
      },
    },
  },
  defaultNetwork: 'hardhat',
  networks: {
    arbitrumTest: getNetworkConfig('arbitrumTest'),
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  mocha: {
    timeout: 30000,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  aragon: {},
};

export default config;
