import {useClient} from './useClient';
import {IDeposit} from '@aragon/sdk-client';

interface IUseFinanceResponse {
  deposit: (deposit: IDeposit) => Promise<void>;
}

export const useFinance = (): IUseFinanceResponse => {
  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();

  const deposit = (deposit: IDeposit) => {
    if (!erc20Client || !whitelistClient) {
      return Promise.reject(
        new Error('SDK client is not initialized correctly')
      );
    }

    return erc20Client.dao
      .deposit(deposit)
      .then(() => Promise.resolve())
      .catch(e => Promise.reject(e));
  };
  return {
    deposit,
  };
};
