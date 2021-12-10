import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {
  IconButton,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconOnlyButton,
  SearchInput,
  WalletButton,
} from '@aragon/ui-components';
import {useWalletProps} from 'containers/walletMenu';
import {useWallet} from 'context/augmentedWallet';
import {NavigationBar} from 'containers/navbar';

const NewDeposit: React.FC = () => {
  const {t} = useTranslation();
  const {connect, isConnected, account, ensName, ensAvatarUrl}: useWalletProps =
    useWallet();

  const handleWalletButtonClick = () => {
    console.log('trigger');
    isConnected() ? open() : connect('injected');
  };

  return (
    <>
      <NavigationBar>
        {/* Icon only button paddings should be changed - the button is rectangular and in this page it needs to be a square */}
        <IconOnlyButton icon={<IconClose />} />
        <WalletButton
          onClick={handleWalletButtonClick}
          isConnected={isConnected()}
          label={
            isConnected() ? ensName || account : t('navButtons.connectWallet')
          }
          src={ensAvatarUrl || account}
        />
      </NavigationBar>

      <Layout>
        <StepCard>
          <CenteredFlex>
            <p className="font-bold text-primary-500">
              {t('finance.newDeposit.depositAssets')}
            </p>
            <p className="text-ui-400">Step 1 of 2</p>
          </CenteredFlex>
          <ProgressBar max="100" value="50" />
          <StepTitle>{t('finance.newDeposit.configureDeposit')}</StepTitle>
          <StepSubTitle>
            {t('finance.newDeposit.configureDepositSubtitle')}
          </StepSubTitle>
        </StepCard>

        <FormLayout>
          <FormItem
            label={t('labels.to') as string}
            helpText={t('finance.newDeposit.toSubtitle') as string}
          />
          <FormItem
            label={t('labels.token') as string}
            helpText={t('finance.newDeposit.tokenSubtitle') as string}
          >
            {/* The one below is not the current input, just a mock one */}
            <SearchInput />
          </FormItem>
          <FormItem
            label={t('labels.amount') as string}
            helpText={t('finance.newDeposit.amountSubtitle') as string}
          />
          <FormItem
            label={t('labels.reference') as string}
            helpText={t('finance.newDeposit.referenceSubtitle') as string}
          />

          <div className="flex justify-between mt-8">
            {/* Should change this to secondary on gray which is unsupported now */}
            <IconButton
              label="Back"
              side="left"
              icon={<IconChevronLeft />}
              mode="tertiary"
            />
            <IconButton
              label="Continue"
              side="right"
              icon={<IconChevronRight />}
              mode="secondary"
            />
          </div>
        </FormLayout>
      </Layout>
    </>
  );
};

export default withTransaction('NewDeposit', 'component')(NewDeposit);

const Layout = styled.div.attrs({
  className: 'm-auto mt-3 w-8/12 font-medium text-ui-600',
})``;

const StepCard = styled.div.attrs({
  className: 'py-4 px-3 rounded-xl bg-ui-0',
})``;

const FormLayout = styled.div.attrs({
  className: 'my-8 mx-auto space-y-5 w-3/4',
})``;

const StepTitle = styled.h1.attrs({
  className: 'mt-4 text-2xl font-bold text-ui-800',
})``;

const StepSubTitle = styled.p.attrs({
  className: 'mt-2 text-lg',
})``;

const CenteredFlex = styled.div.attrs({
  className: 'flex justify-between items-baseline',
})``;

const ProgressBar = styled.progress.attrs({
  className: 'h-1 w-full',
})`
  ::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #e4e7eb;
  }
  ::-webkit-progress-value {
    border-radius: 4px;
    background: linear-gradient(90deg, #0031ad 0%, #003bf5 100.32%);
  }
`;

type FormItemProps = {
  label: string;
  helpText?: string;
};

const FormItem: React.FC<FormItemProps> = ({label, helpText, children}) => (
  <div>
    <h2 className="text-ui-800">{label}</h2>
    <p className="mt-0.5 mb-1.5 text-sm">{helpText}</p>
    {children}
  </div>
);
