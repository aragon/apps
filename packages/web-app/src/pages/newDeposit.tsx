import {Address} from '@aragon/ui-components/src/utils/addresses';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import React, {useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';

import {Finance} from 'utils/paths';
import TokenMenu from 'containers/tokenMenu';
import {useWallet} from 'context/augmentedWallet';
import DepositForm from 'containers/depositForm';
import {formatUnits} from 'utils/library';
import ReviewDeposit from 'containers/reviewDeposit';
import {BaseTokenInfo} from 'utils/types';
import {TokenFormData} from './newWithdraw';
import {useWalletTokens} from 'hooks/useWalletTokens';
import {FullScreenStepper, Step} from 'components/fullScreenStepper';
import {useTransactionContext} from 'context/transactions';

type DepositFormData = TokenFormData & {
  // Deposit data
  to: Address;
  from: Address;
  amount: string;

  // Form metadata
  isCustomToken: boolean;
};

const defaultValues = {
  amount: '',
  reference: '',
  tokenName: '',
  tokenImgUrl: '',
  tokenAddress: '',
  tokenSymbol: '',
  isCustomToken: false,
};

const NewDeposit: React.FC = () => {
  const {t} = useTranslation();
  const {account} = useWallet();
  const formMethods = useForm<DepositFormData>({
    defaultValues,
    mode: 'onChange',
  });
  const {data: walletTokens} = useWalletTokens();
  const {setIsModalOpen} = useTransactionContext();

  /*************************************************
   *                    Hooks                      *
   *************************************************/

  useEffect(() => {
    // add form metadata
    if (account) {
      formMethods.setValue('from', account);
    }
  }, [account, formMethods]);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/

  const handleTokenSelect = (token: BaseTokenInfo) => {
    formMethods.setValue('tokenSymbol', token.symbol);

    // custom token selected, should reset all fields save amount.
    if (token.address === '') {
      formMethods.setValue('isCustomToken', true);
      formMethods.resetField('tokenName');
      formMethods.resetField('tokenImgUrl');
      formMethods.resetField('tokenAddress');
      formMethods.resetField('tokenBalance');
      formMethods.clearErrors('amount');
      return;
    }

    // fill form with curated token values
    formMethods.clearErrors(['tokenAddress', 'tokenSymbol']);
    formMethods.setValue('isCustomToken', false);
    formMethods.setValue('tokenName', token.name);
    formMethods.setValue('tokenImgUrl', token.imgUrl);
    formMethods.setValue('tokenAddress', token.address);
    formMethods.setValue(
      'tokenBalance',
      formatUnits(token.count, token.decimals)
    );

    if (formMethods.formState.dirtyFields.amount) {
      formMethods.trigger('amount');
    }
  };

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <FormProvider {...formMethods}>
      <FullScreenStepper
        navLabel={t('allTransfer.newTransfer')}
        returnPath={Finance}
        wizardProcessName={t('newDeposit.depositAssets')}
      >
        <Step
          wizardTitle={t('newDeposit.configureDeposit')}
          wizardDescription={t('newDeposit.configureDepositSubtitle')}
          isNextButtonDisabled={!formMethods.formState.isValid}
        >
          <DepositForm />
        </Step>
        <Step
          wizardTitle={t('newDeposit.reviewTransfer')}
          wizardDescription={t('newDeposit.reviewTransferSubtitle')}
          nextButtonLabel={t('labels.submitDeposit')}
          onNextButtonClicked={() => setIsModalOpen(true)}
        >
          <ReviewDeposit />
        </Step>
      </FullScreenStepper>
      <TokenMenu
        onTokenSelect={handleTokenSelect}
        tokenBalances={walletTokens}
      />
    </FormProvider>
  );
};

export default withTransaction('NewDeposit', 'component')(NewDeposit);
