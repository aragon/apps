import {isAddress} from 'ethers/lib/utils';
import {useCache} from './useCache';
import {useClient} from './useClient';
import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';
import {Dao} from 'utils/types';

interface useDaoResponse {
  update: (dao: Dao) => Dao;
  createErc20: (dao: ICreateDaoERC20Voting) => Promise<string>;
  createWhitelist: (dao: ICreateDaoWhitelistVoting) => Promise<string>;
  get: (address: string) => Dao;
}

export const useDao = (): useDaoResponse => {
  const {get: getCache, set: setCache} = useCache();
  const {erc20, whitelist} = useClient();
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
    return new Promise((resolve, reject): void => {
      if (erc20) {
        erc20.dao
          .create(dao)
          .then((address: string) => {
            // if creation went correctly should return the dao address
            // this will be used to identify the dao in the cache
            const cacheKey = `dao-${address}`;
            const cacheDao: Dao = {
              address,
            };
            setCache(cacheKey, cacheDao);
            resolve(address);
          })
          .catch((e: Error) => {
            console.log(e);
            // thow error if it fails
            reject(e);
          });
      } else {
        reject('ERC20 SDK client is not initialized correctly');
      }
    });
  };
  const createWhitelist = (dao: ICreateDaoWhitelistVoting): Promise<string> => {
    return new Promise((resolve, reject): void => {
      console.log(whitelist);
      if (whitelist) {
        whitelist.dao
          .create(dao)
          .then((address: string) => {
            // if creation went correctly should return the dao address
            // this will be used to identify the dao in the cache
            const cacheKey = `dao-${address}`;
            const cachedDao: Dao = {
              address,
            };
            setCache(cacheKey, cachedDao);
            resolve(address);
          })
          .catch((e: Error) => {
            // thow error if it fails
            reject(e);
          });
      } else {
        reject('Whitelist SDK client is not initialized correctly');
      }
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
