import {useClient} from './useClient';
import {IDeposit} from '@aragon/sdk-client';

interface IUseFinanceResponse {
  deposit: (depositData: IDeposit) => Promise<void>;
}

export const useFinance = (): IUseFinanceResponse => {
  const {erc20: client} = useClient();

  // hard coding erc20 dao client for now, anticipating future merge.
  // doesn't seem to matter, deposit implementation is the same for both clients.
  const deposit = async (depositData: IDeposit) => {
    if (!client) {
      throw new Error('SDK client is not initialized correctly');
    }

    console.log('depositData', depositData);

    try {
      await client.dao.deposit(depositData);
    } catch (e) {
      console.error(e);
    }
  };

  return {deposit};
};
