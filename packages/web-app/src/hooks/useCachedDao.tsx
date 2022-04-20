import {isAddress} from 'ethers/lib/utils';
import {useCache} from './useCache';
import {useClient} from './useClient';
import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';
import {Dao} from 'utils/types';

interface IUseDaoResponse {
  update: (dao: Dao) => Dao;
  createErc20: (dao: ICreateDaoERC20Voting) => Promise<string>;
  createWhitelist: (dao: ICreateDaoWhitelistVoting) => Promise<string>;
  get: (address: string) => Dao;
}

export const useDao = (): IUseDaoResponse => {
  const {get: getCache, set: setCache} = useCache();
  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();
  const get = (address: string): Dao => {
    if (!isAddress(address)) {
      throw Error('invalid address when trying to get dao');
    }
    const cacheKey = `dao-${address}`;
    const cacheValue = getCache(cacheKey);
    // If dao is in cache return it
    if (cacheValue) {
      return cacheValue;
    }
    // client.getDao(address).then((value) => setCache(cacheKey, value)).catch((e)=> throw Error(e))
    const value: Dao = {
      address,
    };
    setCache(cacheKey, value);
    return value;
  };
  const createErc20 = (dao: ICreateDaoERC20Voting): Promise<string> => {
    if (!erc20Client) {
      return Promise.reject(
        new Error('ERC20 SDK client is not initialized correctly')
      );
    }
    return erc20Client.dao
      .create(dao)
      .then((address: string) => {
        const cacheKey = `dao-${address}`;
        const cacheDao: Dao = {
          address,
        };
        setCache(cacheKey, cacheDao);
        return Promise.resolve(address);
      })
      .catch((e: Error) => {
        return Promise.reject(e);
      });
  };
  const createWhitelist = (dao: ICreateDaoWhitelistVoting): Promise<string> => {
    if (!whitelistClient) {
      return Promise.reject(
        new Error('Whitelist SDK client is not initialized correctly')
      );
    }
    return whitelistClient.dao
      .create(dao)
      .then((address: string) => {
        const cacheKey = `dao-${address}`;
        const cacheDao: Dao = {
          address,
        };
        setCache(cacheKey, cacheDao);
        return Promise.resolve(address);
      })
      .catch((e: Error) => {
        return Promise.reject(e);
      });
  };
  const update = (dao: Dao): Dao => {
    // client.updateDao(dao).then((value) => {
    //   const cacheKey = `dao-${value.id}`
    //   setCache(cacheKey, value)
    // }).catch((e) => { throw Error(e) })
    const cacheKey = `dao-${dao.address}`;
    setCache(cacheKey, dao);
    return dao;
  };
  return {
    get,
    createWhitelist,
    createErc20,
    update,
  };
};
