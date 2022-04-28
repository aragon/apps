import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';

import {
  DaoConfig,
  VotingConfig,
} from '@aragon/sdk-client/dist/internal/interfaces/dao';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import {isAddress} from 'ethers/lib/utils';
import {constants} from 'ethers';
import {useFormContext, useWatch} from 'react-hook-form';

import {useDao} from 'hooks/useCachedDao';
import PublishDaoModal from 'containers/transactionModals/publishDaoModal';
import {TransactionState} from 'utils/constants';
import {getSecondsFromDHM} from 'utils/date';
import {CreateDaoFormData} from 'pages/createDAO';

type MemberShipSettings = ICreateDaoERC20Voting | ICreateDaoWhitelistVoting;

type CreateDaoContextType = {
  /** Prepares the creation transaction awaiting user confirmation */
  handlePublishDao: () => void;
};

type Props = Record<'children', ReactNode>;

const CreateDaoContext = createContext<CreateDaoContextType | null>(null);

const CreateDaoProvider: React.FC<Props> = ({children}) => {
  const [showModal, setShowModal] = useState(false);
  const [transaction, setTransaction] = useState<MemberShipSettings>();
  const [transactionState, setTransactionState] = useState<TransactionState>();

  // Form values
  const {getValues, control} = useFormContext<CreateDaoFormData>();
  const [membership] = useWatch({name: ['membership'], control});

  const {createErc20, createWhitelist} = useDao();

  /*************************************************
   *                   Handlers                    *
   *************************************************/
  const handlePublishDao = () => {
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

  // Handler for modal button click
  const handleExecuteTransaction = async () => {
    // if transaction has already been successfully executed,
    // do not execute it again, close the modal
    // TODO: navigate to new dao when available
    if (transactionState === TransactionState.SUCCESS) {
      handleCloseModal();
      return;
    }

    // if no transaction is set, or transaction already running, do nothing.
    if (!transaction || transactionState === TransactionState.LOADING) {
      console.log('Transaction is running');
      return;
    }

    // proceed with creation if transaction is waiting or was not successfully executed (retry)
    await createDao();
  };

  // Handler for modal close; don't close modal if transaction is still running
  const handleCloseModal = () => {
    if (transactionState !== TransactionState.LOADING) setShowModal(false);
  };

  /*************************************************
   *                   Helpers                     *
   *************************************************/
  // get dao configurations
  const getDaoConfig = useCallback((): DaoConfig => {
    const {daoName} = getValues();
    return {
      name: daoName,
      metadata: constants.AddressZero,
    };
  }, [getValues]);

  // get voting configuration
  const getVotingConfig = useCallback((): VotingConfig => {
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
  }, [getValues]);

  // get settings for erc20 voting DAOs
  const getERC20VotingDaoSettings = useCallback((): ICreateDaoERC20Voting => {
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
  }, [getDaoConfig, getValues, getVotingConfig]);

  // get settings for whitelist voting DAOs
  const getWhiteListVotingDaoSettings =
    useCallback((): ICreateDaoWhitelistVoting => {
      const values = getValues();

      return {
        daoConfig: getDaoConfig(),
        votingConfig: getVotingConfig(),
        gsnForwarder: constants.AddressZero,

        whitelistVoters: values.whitelistWallets.map(wallet => wallet.address),
      };
    }, [getDaoConfig, getValues, getVotingConfig]);

  // run dao creation transaction
  const createDao = useCallback(async () => {
    setTransactionState(TransactionState.LOADING);

    try {
      const address =
        membership === 'token'
          ? await createErc20(transaction as ICreateDaoERC20Voting)
          : await createWhitelist(transaction as ICreateDaoWhitelistVoting);

      // temporary, considering once transaction is successfully executed,
      // we can navigate to the new dao
      console.log('Newly created DAO address', address);
      setTransaction(undefined);
      setTransactionState(TransactionState.SUCCESS);
    } catch (error) {
      // unsuccessful execution, keep transaction for retry
      console.log(error);
      setTransactionState(TransactionState.ERROR);
    }
  }, [createErc20, createWhitelist, membership, transaction]);

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <CreateDaoContext.Provider value={{handlePublishDao}}>
      {children}
      <PublishDaoModal
        state={transactionState || TransactionState.WAITING}
        isOpen={showModal}
        onClose={handleCloseModal}
        callback={handleExecuteTransaction}
        closeOnDrag={transactionState !== TransactionState.LOADING}
      />
    </CreateDaoContext.Provider>
  );
};

function useCreateDaoContext(): CreateDaoContextType {
  return useContext(CreateDaoContext) as CreateDaoContextType;
}

export {useCreateDaoContext, CreateDaoProvider};
