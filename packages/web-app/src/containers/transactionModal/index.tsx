import React, {useState} from 'react';
import {
  AlertInline,
  ButtonText,
  IconReload,
  Modal,
  ModalProps,
  Spinner,
} from '@aragon/ui-components';
import BottomSheet from 'components/bottomSheet';
import useMediaQuery from 'hooks/useMediaQuery';

const ModalBottomSheetSwitcher: React.FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
}) => {
  const matches = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {matches ? (
        <Modal
          isOpen={isOpen}
          onClose={() => onClose && onClose()}
          title={title}
          subtitle={subtitle}
          data-testid="walletCard"
        >
          {children}
        </Modal>
      ) : (
        <BottomSheet
          isOpen={isOpen || false}
          onClose={() => onClose && onClose()}
          title={title}
          subtitle={subtitle}
        >
          {children}
        </BottomSheet>
      )}
    </>
  );
};

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
  approveStepNeeded?: boolean;
  errorLabel?: string;
  successLabel?: string;
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
  approveStepNeeded,
  errorLabel,
  successLabel,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const label = {
    [TransactionState.WAITING]: footerButtonLabel,
    [TransactionState.LOADING]: footerButtonLabel,
    [TransactionState.SUCCESS]: 'Try Again',
    [TransactionState.ERROR]: 'Dismiss',
  };

  return (
    <ModalBottomSheetSwitcher
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={title}
      subtitle={subtitle}
    >
      <div className="bg-white rounded-xl border border-ui-100">
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
    </ModalBottomSheetSwitcher>
  );
};

export default TransactionModal;
