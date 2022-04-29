import React, {useMemo} from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {useTranslation} from 'react-i18next';
import {FormProvider, useForm, useFormState} from 'react-hook-form';

import {FullScreenStepper, Step} from 'components/fullScreenStepper';
import {OverviewDAOFooter, OverviewDAOStep} from 'containers/daoOverview';
import SelectChain from 'containers/selectChainForm';
import DefineMetadata from 'containers/defineMetadata';
import ConfigureCommunity from 'containers/configureCommunity';
import SetupCommunity from 'containers/setupCommunity';
import GoLive, {GoLiveHeader, GoLiveFooter} from 'containers/goLive';
import {WalletField} from '../components/addWallets/row';
import {Dashboard} from 'utils/paths';
import {CreateDaoProvider} from 'context/createDao';
import {constants} from 'ethers';

export type WhitelistWallet = {
  id: string;
  address: string;
};

export type CreateDaoFormData = {
  daoLogo: string;
  daoName: string;
  daoSummary: string;
  tokenName: string;
  tokenSymbol: string;
  tokenTotalSupply: number;
  isCustomToken: boolean;
  links: {label: string; link: string}[];
  wallets: WalletField[];
  tokenAddress: string;
  durationMinutes: string;
  durationHours: string;
  durationDays: string;
  minimumApproval: string;
  minimumParticipation: string;
  support: string;
  membership: string;
  whitelistWallets: WhitelistWallet[];
};

// both wallets and whitelistWallets values are updated
// afterwars to have the acual wallet address instead of
// the My Wallet string
const defaultValues = {
  tokenName: '',
  tokenAddress: '',
  tokenSymbol: '',
  tokenTotalSupply: 0,
  links: [{label: '', href: ''}],
  wallets: [{address: constants.AddressZero, amount: '0'}],
  membership: 'token',
  whitelistWallets: [],
};

const CreateDAO: React.FC = () => {
  const {t} = useTranslation();
  const formMethods = useForm<CreateDaoFormData>({
    mode: 'onChange',
    defaultValues,
  });
  const {errors, dirtyFields} = useFormState({control: formMethods.control});
  const [whitelistWallets, isCustomToken, tokenTotalSupply, membership] =
    formMethods.getValues([
      'whitelistWallets',
      'isCustomToken',
      'tokenTotalSupply',
      'membership',
    ]);

  /*************************************************
   *             Step Validation States            *
   *************************************************/
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const daoMetadataIsValid = useMemo(() => {
    // required fields not dirty
    if (!dirtyFields.daoName || !dirtyFields.daoSummary) return false;

    return errors.daoName || errors.links || errors.daoSummary ? false : true;
  }, [
    dirtyFields.daoName,
    dirtyFields.daoSummary,
    errors.daoName,
    errors.daoSummary,
    errors.links,
  ]);

  const daoSetupCommunityIsValid = useMemo(() => {
    // required fields not dirty
    // if wallet based dao
    if (membership === 'wallet') {
      if (errors.whitelistWallets || whitelistWallets.length === 0) {
        return false;
      }
      return true;
      // if token based dao
    } else {
      if (isCustomToken === true) {
        if (
          !dirtyFields.tokenName ||
          !dirtyFields.wallets ||
          !dirtyFields.tokenSymbol ||
          errors.wallets ||
          tokenTotalSupply === 0
        )
          return false;
        return errors.tokenName || errors.tokenSymbol || errors.wallets
          ? false
          : true;
      } else {
        if (!dirtyFields.tokenAddress || errors.tokenAddress) return false;
        return true;
      }
    }
  }, [
    membership,
    errors.whitelistWallets,
    errors.wallets,
    errors.tokenName,
    errors.tokenSymbol,
    errors.tokenAddress,
    whitelistWallets.length,
    isCustomToken,
    dirtyFields.tokenName,
    dirtyFields.wallets,
    dirtyFields.tokenSymbol,
    dirtyFields.tokenAddress,
    tokenTotalSupply,
  ]);

  const daoConfigureCommunity = useMemo(() => {
    if (
      errors.minimumApproval ||
      errors.support ||
      errors.durationDays ||
      errors.durationHours ||
      errors.durationMinutes
    )
      return false;
    return true;
  }, [
    errors.durationDays,
    errors.durationHours,
    errors.durationMinutes,
    errors.minimumApproval,
    errors.support,
  ]);

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <FormProvider {...formMethods}>
      <CreateDaoProvider>
        <FullScreenStepper
          wizardProcessName={t('createDAO.title')}
          navLabel={t('createDAO.title')}
          returnPath={Dashboard}
        >
          <Step
            fullWidth
            includeStepper={false}
            wizardTitle={t('createDAO.overview.title')}
            wizardDescription={t('createDAO.overview.description')}
            customFooter={<OverviewDAOFooter />}
          >
            <OverviewDAOStep />
          </Step>
          <Step
            wizardTitle={t('createDAO.step1.title')}
            wizardDescription={t('createDAO.step1.description')}
          >
            <SelectChain />
          </Step>
          <Step
            wizardTitle={t('createDAO.step2.title')}
            wizardDescription={t('createDAO.step2.description')}
            isNextButtonDisabled={!daoMetadataIsValid}
          >
            <DefineMetadata />
          </Step>
          <Step
            wizardTitle={t('createDAO.step3.title')}
            wizardDescription={t('createDAO.step3.description')}
            isNextButtonDisabled={!daoSetupCommunityIsValid}
          >
            <SetupCommunity />
          </Step>
          <Step
            wizardTitle={t('createDAO.step4.title')}
            wizardDescription={t('createDAO.step4.description')}
            isNextButtonDisabled={!daoConfigureCommunity}
          >
            <ConfigureCommunity />
          </Step>
          <Step
            hideWizard
            fullWidth
            customHeader={<GoLiveHeader />}
            customFooter={<GoLiveFooter />}
          >
            <GoLive />
          </Step>
        </FullScreenStepper>
        <>{JSON.stringify(formMethods.watch(), null, 2)}</>
      </CreateDaoProvider>
    </FormProvider>
  );
};

export default withTransaction('CreateDAO', 'component')(CreateDAO);
