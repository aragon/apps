import {useClient} from './useClient';
import {IDeposit} from '@aragon/sdk-client';

interface IUseFinanceResponse {
  deposit: (deposit: IDeposit, daoType: DaoType) => Promise<void>;
}

type DaoType = 'wallet-based' | 'token-based';

export const useFinance = (): IUseFinanceResponse => {
  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();

  const deposit = (deposit: IDeposit, daoType: DaoType) => {
    if (!erc20Client || !whitelistClient) {
      return Promise.reject(
        new Error('SDK client is not initialized correctly')
      );
    }
    let client;
    if (daoType === 'wallet-based') {
      client = whitelistClient;
    } else {
      client = erc20Client;
    }
    return client.dao
      .deposit(deposit)
      .then(() => Promise.resolve())
      .catch(e => Promise.reject(e));
  };
  return {
    deposit,
  };
};
