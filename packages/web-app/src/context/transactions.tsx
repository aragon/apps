import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

import {TransactionItem} from 'utils/types';
import {TransactionState, TransferTypes} from 'utils/constants';
import PublishDaoModal from 'containers/transactionModals/publishDaoModal';
import {useFormContext} from 'react-hook-form';
import {useDao} from 'hooks/useCachedDao';
import {
  ICreateDaoERC20Voting,
  ICreateDaoWhitelistVoting,
} from '@aragon/sdk-client';
import {constants, ethers} from 'ethers';
import {WalletField} from 'components/addWallets/row';
import {WhitelistWallet} from 'pages/createDAO';
import {isAddress} from 'ethers/lib/utils';
import {getSecondsFromDHM} from 'utils/date';

const TransactionsContext = createContext<TransactionsContextType | null>(null);

type TransactionsContextType = {
  transaction?: TransactionItem;
  setTransactionState: (value: TransactionState) => void;
  setTransaction: (value: TransactionItem) => void;
  setIsModalOpen: (value: boolean) => void;
};

type Props = Record<'children', ReactNode>;

/**
 * This Context must refactor later and add more attributes to cover whole transactions process
 */

const TransactionsProvider: React.FC<Props> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<TransactionItem>();
  const [transactionState, setTransactionState] = useState<TransactionState>(
    TransactionState.WAITING
  );
  const {createErc20: createErc20Dao, createWhitelist: createWhitelistDao} =
    useDao();
  const {getValues} = useFormContext();

  const value = useMemo(
    (): TransactionsContextType => ({
      transaction,
      setTransactionState,
      setTransaction,
      setIsModalOpen,
    }),
    [transaction]
  );

  const handlePublishDao = () => {
    if (transactionState === TransactionState.SUCCESS) {
      setIsModalOpen(false);
      setTransactionState(TransactionState.WAITING);
      return;
    }
    // set state to loading
    setTransactionState(TransactionState.LOADING);
    // get common data
    const {
      daoName,
      // these 2 fields will be used for the metadata
      // daoLogo,
      // daoSummary,
      membership,
      durationMinutes,
      durationHours,
      durationDays,
      minimumApproval,
      minimumParticipation,
    } = getValues();

    if (membership === 'token') {
      // if membership is token get token data from form
      const {isCustomToken, tokenAddress, tokenName, tokenSymbol, wallets} =
        getValues();
      const mintConfig = wallets
        .filter((wallet: WalletField) => {
          return isAddress(wallet.address);
        })
        .map((wallet: WalletField) => {
          return {address: wallet.address, balance: BigInt(wallet.amount)};
        });
      const createDaoForm: ICreateDaoERC20Voting = {
        daoConfig: {
          name: daoName,
          // metadata TBD
          metadata: constants.AddressZero,
        },
        tokenConfig: {
          address: isCustomToken ? ethers.constants.AddressZero : tokenAddress,
          name: tokenName,
          symbol: tokenSymbol,
        },
        mintConfig,
        votingConfig: {
          minParticipation: parseInt(minimumParticipation || 0),
          minSupport: parseInt(minimumApproval || 0),
          minDuration: getSecondsFromDHM(
            durationDays,
            durationHours,
            durationMinutes
          ),
        },
        gsnForwarder: constants.AddressZero,
      };
      createErc20Dao(createDaoForm)
        .then((address: string) => {
          // if success set state to success
          setTransactionState(TransactionState.SUCCESS);
          // TODO this console should be deleted when it stops being useful
          // the form should reset too and redirect to a correct page
          console.log(address);
        })
        .catch(e => {
          // if error set state to error to allow retry
          // TODO this console should be deleted when it stops being useful
          console.error(e);
          setTransactionState(TransactionState.ERROR);
        });
      return;
    } else if (membership === 'wallet') {
      // if membership is wallet get wallets
      const whitelistWallets = getValues(
        'whitelistWallets'
      ) as WhitelistWallet[];
      // create whitelist dao object
      const createDaoForm: ICreateDaoWhitelistVoting = {
        daoConfig: {
          name: daoName,
          // metadata TBD
          metadata: constants.AddressZero,
        },
        whitelistVoters: whitelistWallets.map(wallet => wallet.address),
        votingConfig: {
          minParticipation: parseInt(minimumParticipation || 0),
          minSupport: parseInt(minimumApproval || 0),
          minDuration: getSecondsFromDHM(
            durationDays,
            durationHours,
            durationMinutes
          ),
        },
        gsnForwarder: constants.AddressZero,
      };
      // call create whitelist function
      createWhitelistDao(createDaoForm)
        .then((address: string) => {
          // if success set state to success
          setTransactionState(TransactionState.SUCCESS);
          // TODO this console should be deleted when it stops being useful
          // the form should reset too and redirect to a correct page
          console.log(address);
        })
        .catch(e => {
          // if error set state to error to allow retry
          // TODO this console should be deleted when it stops being useful
          console.error(e);
          setTransactionState(TransactionState.ERROR);
        });
      return;
    }
    // if membership is not allowed set state to error
    setTransactionState(TransactionState.ERROR);
    throw new Error('unsuported memebership type: ' + membership);
  };
  const renderModal = useMemo(() => {
    let modal;
    // This switch case will halp us to pass different modals for different types of transactions
    switch (transaction?.type) {
      case TransferTypes.Deposit:
        modal = (
          <PublishDaoModal
            state={transactionState}
            callback={handlePublishDao}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
        break;
      case TransferTypes.Withdraw:
        break;
      default:
        modal = (
          <PublishDaoModal
            state={transactionState}
            callback={handlePublishDao}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
        break;
    }
    return (
      <>
        {children}
        {modal}
      </>
    );
    // here i'm omitting the handle publish dao dependency
    // because then I should use the useCallback hook to
    // define the function and for some reason then the client
    // is not updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, transactionState, transaction, isModalOpen]);

  return (
    <TransactionsContext.Provider value={value}>
      {renderModal}
    </TransactionsContext.Provider>
  );
};

function useTransactionContext(): TransactionsContextType {
  return useContext(TransactionsContext) as TransactionsContextType;
}

export {useTransactionContext, TransactionsProvider};
