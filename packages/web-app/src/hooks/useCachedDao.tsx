import {useCache} from './useCache';
import {useClient} from './useClient';
import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';
import {Dao} from 'utils/types';

interface IUseDaoResponse {
  createErc20: (dao: ICreateDaoERC20Voting) => Promise<string>;
  createWhitelist: (dao: ICreateDaoWhitelistVoting) => Promise<string>;
}

export const useDao = (): IUseDaoResponse => {
  const {set: setCache} = useCache();
  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();

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
  return {
    createWhitelist,
    createErc20,
  };
};
