import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';

import {
  DaoConfig,
  VotingConfig,
} from '@aragon/sdk-client/dist/internal/interfaces/dao';

import {constants} from 'ethers';
import {isAddress} from 'ethers/lib/utils';
import {useFormContext} from 'react-hook-form';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import {useDao} from 'hooks/useCachedDao';
import PublishDaoModal from 'containers/transactionModals/publishDaoModal';
import {TransactionState} from 'utils/constants';
import {getSecondsFromDHM} from 'utils/date';
import {CreateDaoFormData} from 'pages/createDAO';

const TransactionsContext = createContext<TransactionsContextType | null>(null);
type DAOtype = ICreateDaoERC20Voting | ICreateDaoWhitelistVoting;

type TransactionsContextType = {
  scheduleTransaction: () => void;
};

type Props = Record<'children', ReactNode>;

/**
 * This Context must refactor later and add more attributes to cover whole transactions process
 */

const TransactionsProvider: React.FC<Props> = ({children}) => {
  const {getValues} = useFormContext<CreateDaoFormData>();
  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState<DAOtype>();
  const [transactionState, setTransactionState] = useState<TransactionState>();

  const {createErc20, createWhitelist} = useDao();

  useEffect(() => {
    // estimate gas fee for transaction
    if (transactionState === TransactionState.WAITING) {
      const setIntervalId = setInterval(
        () => console.log('polling gas fee'),
        5000
      );
      return () => clearInterval(setIntervalId);
    }
  }, [transactionState]);

  // schedule transaction
  const scheduleCreateDao = () => {
    const {membership} = getValues();

    switch (membership) {
      case 'token':
        setTransaction(getERC20VotingDaoSettings());
        break;
      case 'wallet':
        setTransaction(getWhiteListVotingDaoSettings());
        break;
      default:
        throw new Error(`Unknown dao type: ${membership}`);
    }
    setTransactionState(TransactionState.WAITING);
    setShowModal(true);
  };

  // get settings for erc20 voting daos
  const getERC20VotingDaoSettings = (): ICreateDaoERC20Voting => {
    const values = getValues();

    return {
      daoConfig: getDaoConfig(),
      votingConfig: getVotingConfig(),
      gsnForwarder: constants.AddressZero,

      // token configuration
      tokenConfig: {
        address: values.isCustomToken
          ? constants.AddressZero
          : values.tokenAddress,
        name: values.tokenName,
        symbol: values.tokenSymbol,
      },

      // mint configuration
      mintConfig: values.wallets
        .filter(wallet => isAddress(wallet.address))
        .map(wallet => ({
          address: wallet.address,
          balance: BigInt(wallet.amount),
        })),
    };
  };

  // get settings for whitelist voting daos
  const getWhiteListVotingDaoSettings = (): ICreateDaoWhitelistVoting => {
    const values = getValues();

    return {
      daoConfig: getDaoConfig(),
      votingConfig: getVotingConfig(),
      gsnForwarder: constants.AddressZero,

      whitelistVoters: values.whitelistWallets.map(wallet => wallet.address),
    };
  };

  const getDaoConfig = (): DaoConfig => {
    const {daoName} = getValues();
    return {
      name: daoName,
      metadata: constants.AddressZero,
    };
  };

  const getVotingConfig = (): VotingConfig => {
    const {
      minimumApproval,
      minimumParticipation,
      durationDays,
      durationHours,
      durationMinutes,
    } = getValues();

    return {
      minParticipation: parseInt(minimumParticipation) || 0,
      minSupport: parseInt(minimumApproval) || 0,
      minDuration: getSecondsFromDHM(
        parseInt(durationDays),
        parseInt(durationHours),
        parseInt(durationMinutes)
      ),
    };
  };

  const handleExecuteTransaction = async () => {
    const {membership} = getValues();

    if (!transaction) {
      console.log('No transaction to execute');
      return;
    }

    if (transactionState === TransactionState.LOADING) {
      console.log('Transaction running');
      return;
    }

    await createDao(membership);
  };

  const createDao = async (membership: string) => {
    setTransactionState(TransactionState.LOADING);

    try {
      const address =
        membership === 'token'
          ? await createErc20(transaction as ICreateDaoERC20Voting)
          : await createWhitelist(transaction as ICreateDaoWhitelistVoting);

      console.log(address);

      setTransactionState(TransactionState.SUCCESS);
      setTransaction(undefined);
    } catch (error) {
      console.log(error);
      setTransactionState(TransactionState.ERROR);
    }

    console.log('show modal', showModal);
  };

  return (
    <TransactionsContext.Provider
      value={{scheduleTransaction: scheduleCreateDao}}
    >
      {children}
      <PublishDaoModal
        state={transactionState || TransactionState.WAITING}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        callback={handleExecuteTransaction}
      />
    </TransactionsContext.Provider>
  );
};

function useTransactionContext(): TransactionsContextType {
  return useContext(TransactionsContext) as TransactionsContextType;
}

export {useTransactionContext, TransactionsProvider};
