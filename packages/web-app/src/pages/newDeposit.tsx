import {
  ButtonIcon,
  ButtonText,
  ButtonWallet,
  IconChevronLeft,
  IconChevronRight,
  IconMenuVertical,
  Wizard,
} from '@aragon/ui-components';
import styled from 'styled-components';
import React, {useCallback, useEffect, useState} from 'react';
import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {useWallet} from 'context/augmentedWallet';
import DepositForm from 'containers/depositForm';
import {NavigationBar} from 'containers/navbar';
import {TransferTypes} from 'utils/constants';
import {useWalletProps} from 'containers/walletMenu';
import {useWalletMenuContext} from 'context/walletMenu';

export type FormData = {
  amount: number;
  reference?: string;
  type: TransferTypes;
  from: Address | null; // null because of useWallet props types
  to: Address;
  tokenSymbol: string;
  tokenAddress: Address;
};

enum Steps {
  'Configure Deposit' = 1,
  'Review Transfer' = 2,
}

const TOTAL_STEPS = Object.keys(Steps).length / 2;

const defaultValues = {
  amount: 0,
  reference: '',
  tokenAddress: '',
  tokenSymbol: '',
};

const NewDeposit: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useWalletMenuContext();
  const [currentStep, setStep] = useState<Steps>(Steps['Configure Deposit']);
  const {control, watch, setValue} = useForm<FormData>({defaultValues});

  const {connect, isConnected, account, ensName, ensAvatarUrl}: useWalletProps =
    useWallet();

  /**************************************************
   *                      Hooks                     *
   **************************************************/
  useEffect(() => {
    if (account) {
      setValue('from', account);
      setValue('type', TransferTypes.Deposit);
    }
  }, [account, setValue]);

  /**************************************************
   *            Functions and Callbacks             *
   **************************************************/
  /** Function used for navigating to the next step in the process */
  const gotoNextStep = useCallback(() => {
    if (currentStep !== TOTAL_STEPS) {
      setStep(current => current + 1);
    }
  }, [currentStep]);

  /** Function used for navigating to the previous step in the process */
  const gotoPreviousStep = useCallback(() => {
    if (currentStep !== 1) {
      setStep(current => current - 1);
    }
  }, [currentStep]);

  /** Toggle wallet */
  const handleWalletButtonClick = useCallback(() => {
    console.log('trigger');
    isConnected() ? open() : connect('injected');
  }, [connect, isConnected, open]);

  /**************************************************
   *                     Render                     *
   **************************************************/
  return (
    <>
      <NavigationBar>
        <HStack>
          <InsetButton>
            <InsetIconContainer>
              <IconChevronLeft />
            </InsetIconContainer>
            <InsetButtonText>{t('allTransfer.newTransfer')}</InsetButtonText>
          </InsetButton>

          <ButtonIcon
            mode="secondary"
            size="large"
            icon={<IconMenuVertical />}
          />
        </HStack>

        <ButtonWallet
          onClick={handleWalletButtonClick}
          isConnected={isConnected()}
          label={
            isConnected() ? ensName || account : t('navButtons.connectWallet')
          }
          src={ensAvatarUrl || account}
        />
      </NavigationBar>

      <Layout>
        <Wizard
          processName={t('newDeposit.depositAssets')}
          currentStep={currentStep}
          totalSteps={TOTAL_STEPS}
          title={t('newDeposit.configureDeposit')}
          description={t('newDeposit.configureDepositSubtitle')}
        />
        <FormLayout>
          {currentStep === Steps['Configure Deposit'] ? (
            <DepositForm control={control} />
          ) : (
            <h1>Review Deposit</h1>
          )}
          <FormFooter>
            {/* Should change this to secondary on gray which is unsupported now */}
            <ButtonText
              label="Back"
              mode="secondary"
              size="large"
              onClick={gotoPreviousStep}
              disabled={currentStep === 1}
              iconLeft={<IconChevronLeft />}
            />
            <ButtonText
              label="Continue"
              size="large"
              onClick={gotoNextStep}
              iconRight={<IconChevronRight />}
            />
          </FormFooter>
        </FormLayout>
        {/* View form values; to be removed later */}
        <pre className="mt-2">
          Form values: {JSON.stringify(watch(), null, 2)}
        </pre>
      </Layout>
    </>
  );
};

export default withTransaction('NewDeposit', 'component')(NewDeposit);

const Layout = styled.div.attrs({
  className: 'm-auto mt-3 w-8/12 font-medium text-ui-600',
})``;

const FormLayout = styled.div.attrs({
  className: 'my-8 mx-auto space-y-5 w-3/4',
})``;

const HStack = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;

const InsetButton = styled.div.attrs({
  className: 'flex items-center p-0.5 rounded-xl bg-ui-0',
})``;

const InsetIconContainer = styled.div.attrs({
  className: 'p-1.5 rounded-lg bg-ui-50',
})``;

const InsetButtonText = styled.div.attrs({
  className: 'pr-2 pl-1.5 font-bold text-ui-700',
})``;

const FormFooter = styled.div.attrs({
  className: 'flex justify-between mt-8',
})``;
