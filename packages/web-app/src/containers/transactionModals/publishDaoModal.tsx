import React, {useMemo} from 'react';
import {
  AlertInline,
  ButtonText,
  IconReload,
  Spinner,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {formatEther} from 'ethers/lib/utils';
import {useTranslation} from 'react-i18next';
import {IGasFeeEstimation} from '@aragon/sdk-client/dist/internal/interfaces/dao';

import {usePollGasFee} from 'hooks/usePollGasfee';
import {TransactionState} from 'utils/constants';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';

type PublishDaoModalProps = {
  state: TransactionState;
  callback: () => void;
  isOpen: boolean;
  onClose: () => void;
  closeOnDrag: boolean;
  estimationFunction: () => Promise<IGasFeeEstimation | undefined>;
};

const icons = {
  [TransactionState.WAITING]: undefined,
  [TransactionState.LOADING]: <Spinner size="xs" color="white" />,
  [TransactionState.SUCCESS]: undefined,
  [TransactionState.ERROR]: <IconReload />,
};

const PublishDaoModal: React.FC<PublishDaoModalProps> = ({
  state = TransactionState.LOADING,
  callback,
  isOpen,
  onClose,
  closeOnDrag,
  estimationFunction,
}) => {
  const {t} = useTranslation();
  const {tokenPrice, maxFee, averageFee} = usePollGasFee(estimationFunction);

  const label = {
    [TransactionState.WAITING]: t('TransactionModal.publishDaoButtonLabel'),
    [TransactionState.LOADING]: t('TransactionModal.publishDaoButtonLabel'),
    [TransactionState.SUCCESS]: t('TransactionModal.dismiss'),
    [TransactionState.ERROR]: t('TransactionModal.tryAgain'),
  };

  const totalCost = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(Number(formatEther(averageFee.toString())) * tokenPrice),
    [averageFee, tokenPrice]
  );

  return (
    <ModalBottomSheetSwitcher
      {...{isOpen, onClose, closeOnDrag}}
      title={t('TransactionModal.publishDao')}
    >
      <GasCostTableContainer>
        <GasCostEthContainer>
          <VStack>
            <Label>{t('TransactionModal.estimatedFees')}</Label>
            <p className="text-sm text-ui-500">
              {t('TransactionModal.maxFee')}
            </p>
          </VStack>
          <VStack>
            <StrongText>{`${formatEther(
              averageFee.toString()
            )} ETH`}</StrongText>
            <p className="text-sm text-right text-ui-500">{`${formatEther(
              maxFee.toString()
            )} ETH`}</p>
          </VStack>
        </GasCostEthContainer>

        <GasTotalCostEthContainer>
          <Label>{t('TransactionModal.totalCost')}</Label>
          <VStack>
            <StrongText>{`${formatEther(
              averageFee.toString()
            )} ETH`}</StrongText>
            <p className="text-sm text-right text-ui-500">{totalCost}</p>
          </VStack>
        </GasTotalCostEthContainer>
      </GasCostTableContainer>
      <ButtonContainer>
        <ButtonText
          className="mt-3 w-full"
          label={label[state]}
          iconLeft={icons[state]}
          isActive={state === TransactionState.LOADING}
          onClick={callback}
        />
        {state === TransactionState.SUCCESS && (
          <AlertInlineContainer>
            <AlertInline
              label={t('TransactionModal.successLabel')}
              mode="success"
            />
          </AlertInlineContainer>
        )}
        {state === TransactionState.ERROR && (
          <AlertInlineContainer>
            <AlertInline
              label={t('TransactionModal.errorLabel')}
              mode="critical"
            />
          </AlertInlineContainer>
        )}
      </ButtonContainer>
    </ModalBottomSheetSwitcher>
  );
};

export default PublishDaoModal;

const GasCostTableContainer = styled.div.attrs({
  className: 'm-3 bg-white rounded-xl border border-ui-100 divide-y',
})``;

const GasCostEthContainer = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2',
})``;

const GasTotalCostEthContainer = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2 rounded-b-xl bg-ui-100',
})``;

const AlertInlineContainer = styled.div.attrs({
  className: 'mx-auto mt-2 w-max',
})``;

const ButtonContainer = styled.div.attrs({
  className: 'px-3 pb-3 rounded-b-xl',
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
