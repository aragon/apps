import React from 'react';
import {
  AlertInline,
  ButtonText,
  IconReload,
  LinearProgress,
  Spinner,
} from '@aragon/ui-components';
import {useStepper} from 'hooks/useStepper';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useGlobalModalContext} from 'context/globalModals';

export enum TransactionState {
  WAITING = 'WAITING',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type TransactionModalProps = {
  title: string;
  footerButtonLabel: string;
  state: TransactionState;
  callback: () => void;
  subtitle?: string;
  successLabel?: string;
  errorLabel?: string;
  approveStepNeeded?: boolean;
  approveCallback?: () => void;
};

const icons = {
  [TransactionState.WAITING]: undefined,
  [TransactionState.LOADING]: <Spinner size="xs" color="white" />,
  [TransactionState.SUCCESS]: undefined,
  [TransactionState.ERROR]: <IconReload />,
};

const TransactionModal: React.FC<TransactionModalProps> = ({
  title,
  footerButtonLabel,
  state,
  callback,
  subtitle,
  successLabel,
  errorLabel,
  approveStepNeeded = false,
  approveCallback,
}) => {
  const {isTransactionOpen, close} = useGlobalModalContext();
  const {currentStep, next} = useStepper(2);

  const label = {
    [TransactionState.WAITING]: footerButtonLabel,
    [TransactionState.LOADING]: footerButtonLabel,
    [TransactionState.SUCCESS]: 'Dismiss',
    [TransactionState.ERROR]: 'Try Again',
  };

  const handleApproveClick = () => {
    if (approveCallback) {
      approveCallback();
    }
    next();
  };

  return (
    <ModalBottomSheetSwitcher
      isOpen={isTransactionOpen}
      onClose={() => close('transaction')}
      title={title}
      subtitle={subtitle}
    >
      <div className="m-3 bg-white rounded-xl border border-ui-100">
        <div className="flex justify-between py-1.5 px-2">
          <div className="space-y-0.25">
            <p className="text-ui-600">Estimated Gas Fees</p>
            <p className="text-sm text-ui-500">Synced 30 sec ago</p>
          </div>
          <div className="text-right space-y-0.25">
            <p className="font-bold text-ui-600">0.001ETH</p>
            <p className="text-sm text-ui-500">127gwei</p>
          </div>
        </div>
        <div className="flex justify-between py-1.5 px-2 rounded-b-xl bg-ui-100">
          <div className="space-y-0.25">
            <p className="text-ui-600">Total Cost</p>
          </div>
          <div className="text-right space-y-0.25">
            <p className="font-bold text-ui-600">$16.28</p>
          </div>
        </div>
      </div>
      {approveStepNeeded ? (
        <div className="p-3 bg-white rounded-b-xl">
          <div className="flex justify-between mb-1 text-sm">
            <p className="font-bold text-primary-500">
              {currentStep === 1 ? 'Approve token' : 'Sign Deposit'}
            </p>
            <p className="text-ui-400">{`Step ${currentStep} of 2`}</p>
          </div>
          <LinearProgress max={2} value={currentStep} />
          <p className="mt-1 text-sm text-ui-600">
            To sign your first transaction, you must approve Aragon Zaragoza to
            make a transaction with your token.
          </p>
          <div className="flex space-x-2">
            <ButtonText
              className="mt-3 w-full"
              label="Approve token"
              iconLeft={icons[state]}
              onClick={handleApproveClick}
              disabled={currentStep !== 1}
            />
            <ButtonText
              className="mt-3 w-full"
              label={label[state]}
              iconLeft={icons[state]}
              onClick={callback}
              disabled={currentStep !== 2}
            />
          </div>
          {state === TransactionState.ERROR && (
            <div className="mx-auto mt-2 w-max">
              <AlertInline
                label={errorLabel || 'Error while confirmation'}
                mode="critical"
              />
            </div>
          )}
          {state === TransactionState.SUCCESS && (
            <div className="mx-auto mt-2 w-max">
              <AlertInline
                label={successLabel || 'Transaction successful'}
                mode="success"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="px-3 pb-3 rounded-b-xl">
          <ButtonText
            className="mt-3 w-full"
            label={label[state]}
            iconLeft={icons[state]}
            onClick={callback}
          />
          {state === TransactionState.ERROR && (
            <div className="mx-auto mt-2 w-max">
              <AlertInline
                label={errorLabel || 'Error while confirmation'}
                mode="critical"
              />
            </div>
          )}
          {state === TransactionState.SUCCESS && (
            <div className="mx-auto mt-2 w-max">
              <AlertInline
                label={successLabel || 'Transaction successful'}
                mode="success"
              />
            </div>
          )}
        </div>
      )}
    </ModalBottomSheetSwitcher>
  );
};

export default TransactionModal;
