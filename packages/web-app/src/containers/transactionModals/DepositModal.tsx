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
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {TransactionState} from 'utils/constants/misc';

type TransactionModalProps = {
  state: TransactionState;
  callback: () => void;
  isOpen: boolean;
  onClose: () => void;
  closeOnDrag: boolean;
};

const icons = {
  [TransactionState.WAITING]: undefined,
  [TransactionState.LOADING]: <Spinner size="xs" color="white" />,
  [TransactionState.SUCCESS]: undefined,
  [TransactionState.ERROR]: <IconReload />,
};

const DepositModal: React.FC<TransactionModalProps> = ({
  state = TransactionState.WAITING,
  callback,
  isOpen,
  onClose,
  closeOnDrag,
}) => {
  const {currentStep, next} = useStepper(2);
  const {t} = useTranslation();

  const label = {
    [TransactionState.WAITING]: t('TransactionModal.signDeposit'),
    [TransactionState.LOADING]: t('TransactionModal.signDeposit'),
    [TransactionState.SUCCESS]: t('TransactionModal.dismiss'),
    [TransactionState.ERROR]: t('TransactionModal.tryAgain'),
  };

  const handleApproveClick = () => {
    next();
  };
  const handleButtonClick = () => {
    switch (state) {
      case TransactionState.SUCCESS:
        onClose();
        break;
      case TransactionState.LOADING:
        break;
      default:
        callback();
    }
  };

  return (
    <ModalBottomSheetSwitcher
      {...{isOpen, onClose, closeOnDrag}}
      title={t('TransactionModal.signDeposit')}
    >
      <GasCostTableContainer>
        <DepositAmountContainer>
          <VStack>
            <Label>{t('labels.deposit')}</Label>
          </VStack>
          <VStack>
            <StrongText>{'0.0015 ETH'}</StrongText>
            <p className="text-sm text-right text-ui-500">{'$6.00'}</p>
          </VStack>
        </DepositAmountContainer>
        <GasCostEthContainer>
          <VStack>
            <Label>{t('TransactionModal.estimatedFees')}</Label>
            <p className="text-sm text-ui-500">
              {`${t('TransactionModal.synced', {time: 30})}`}
            </p>
          </VStack>
          <VStack>
            <StrongText>{'0.001ETH'}</StrongText>
            <p className="text-sm text-right text-ui-500">{'127gwei'}</p>
          </VStack>
        </GasCostEthContainer>

        <GasCostUSDContainer>
          <Label>{t('TransactionModal.totalCost')}</Label>
          <StrongText>{'$16.28'}</StrongText>
        </GasCostUSDContainer>
      </GasCostTableContainer>
      <ApproveTxContainer>
        <WizardContainer>
          <PrimaryColoredText>
            {currentStep === 1
              ? t('TransactionModal.approveToken')
              : t('TransactionModal.signDeposit')}
          </PrimaryColoredText>
          <p className="text-ui-400">{`${t('labels.step')} ${currentStep} ${t(
            'labels.of'
          )} 2`}</p>
        </WizardContainer>

        <LinearProgress max={2} value={currentStep} />

        <ApproveSubtitle>
          {t('TransactionModal.approveSubtitle')}
        </ApproveSubtitle>
        <HStack>
          <ButtonText
            className="mt-3 w-full"
            label={t('TransactionModal.approveToken')}
            iconLeft={currentStep === 1 ? icons[state] : undefined}
            onClick={handleApproveClick}
            disabled={currentStep !== 1}
          />
          <ButtonText
            className="mt-3 w-full"
            label={label[state]}
            iconLeft={icons[state]}
            onClick={handleButtonClick}
            disabled={currentStep !== 2}
          />
        </HStack>

        {state === TransactionState.ERROR && (
          <AlertInlineContainer>
            <AlertInline
              label={t('TransactionModal.errorLabel')}
              mode="critical"
            />
          </AlertInlineContainer>
        )}
        {state === TransactionState.SUCCESS && (
          <AlertInlineContainer>
            <AlertInline
              label={t('TransactionModal.successLabel')}
              mode="success"
            />
          </AlertInlineContainer>
        )}
      </ApproveTxContainer>
    </ModalBottomSheetSwitcher>
  );
};

export default DepositModal;

const GasCostTableContainer = styled.div.attrs({
  className: 'm-3 bg-white rounded-xl border border-ui-100',
})``;

const GasCostEthContainer = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2',
})``;

const DepositAmountContainer = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2 border-ui-100',
})`
  border-bottom-width: 2px;
`;

const GasCostUSDContainer = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2 rounded-b-xl bg-ui-100',
})``;

const ApproveTxContainer = styled.div.attrs({
  className: 'p-3 bg-white rounded-b-xl',
})``;

const AlertInlineContainer = styled.div.attrs({
  className: 'mx-auto mt-2 w-max',
})``;

const HStack = styled.div.attrs({
  className: 'flex space-x-2',
})``;

const WizardContainer = styled.div.attrs({
  className: 'flex justify-between mb-1 text-sm',
})``;

const VStack = styled.div.attrs({
  className: 'space-y-0.25',
})``;

const StrongText = styled.p.attrs({
  className: 'font-bold text-right text-ui-600',
})``;

const Label = styled.p.attrs({
  className: 'text-ui-600',
})``;

const PrimaryColoredText = styled.p.attrs({
  className: 'font-bold text-primary-500',
})``;

const ApproveSubtitle = styled.p.attrs({
  className: 'mt-1 text-sm text-ui-600',
})``;
