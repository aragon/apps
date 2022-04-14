import styled from 'styled-components';
import React, {useEffect, lazy, Suspense} from 'react';

// FIXME: Change route to ApmRoute once package has been updated to be
// compatible with react-router-dom v6
import {Navigate, Routes, Route, useLocation} from 'react-router-dom';

import Navbar from 'containers/navbar';
import {WalletMenu} from 'containers/navbar/walletMenu';
import {trackPage} from 'services/analytics';
import TransferMenu from 'containers/transferMenu';
import TransactionModal, {TransactionState} from 'containers/transactionModal';
import '../i18n.config';

// HACK: All pages MUST be exported with the withTransaction function
// from the '@elastic/apm-rum-react' package in order for analytics to
// work properly on the pages.
import HomePage from 'pages/home';
import * as paths from 'utils/paths';
import DaoSelectMenu from 'containers/navbar/daoSelectMenu';
import PrivacyPolicy from 'containers/privacyPolicy';

const TokensPage = lazy(() => import('pages/tokens'));
const FinancePage = lazy(() => import('pages/finance'));
const NotFoundPage = lazy(() => import('pages/notFound'));
const CommunityPage = lazy(() => import('pages/community'));
const TransfersPage = lazy(() => import('pages/transfers'));
const GovernancePage = lazy(() => import('pages/governance'));
const ProposalPage = lazy(() => import('pages/proposal'));
const NewDepositPage = lazy(() => import('pages/newDeposit'));
const NewWithdrawPage = lazy(() => import('pages/newWithdraw'));
const CreateDAOPage = lazy(() => import('pages/createDAO'));
const NewProposalPage = lazy(() => import('pages/newProposal'));

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    trackPage(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col mb-14 desktop:mb-10 bg-ui-50">
      <Navbar />
      <Layout>
        {/* TODO: replace with loading indicator */}
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path={paths.NewDeposit} element={<NewDepositPage />} />
            <Route path={paths.NewWithDraw} element={<NewWithdrawPage />} />
            <Route path={paths.CreateDAO} element={<CreateDAOPage />} />
            <Route path={paths.Landing} element={<HomePage />} />
            <Route path={paths.Community} element={<CommunityPage />} />
            <Route path={paths.Finance} element={<FinancePage />} />
            <Route path={paths.Governance} element={<GovernancePage />} />
            <Route path={paths.NewProposal} element={<NewProposalPage />} />
            <Route path={paths.Proposal} element={<ProposalPage />} />
            <Route path={paths.AllTokens} element={<TokensPage />} />
            <Route path={paths.AllTransfers} element={<TransfersPage />} />
            <Route path={paths.NotFound} element={<NotFoundPage />} />
            <Route
              path="*"
              element={<Navigate to={paths.NotFound} replace />}
            />
          </Routes>
        </Suspense>
      </Layout>
      <PrivacyPolicy />
      <TransferMenu />
      <DaoSelectMenu />
      <WalletMenu />
      <TransactionModal
        title="Sign Deposit"
        subtitle="To register your deposit, you need to submit a transaction which costs you following."
        footerButtonLabel="Sign Deposit"
        state={TransactionState.SUCCESS}
        callback={console.log}
        approveStepNeeded
      />
    </div>
  );
}

const Layout = styled.main.attrs({
  className:
    'grid grid-cols-4 tablet:grid-cols-8 ' +
    'desktop:grid-cols-12 gap-x-2 desktop:gap-x-3 ' +
    'wide:gap-x-4 mx-2 tablet:mx-3 desktop:mx-5 wide:mx-auto wide:w-190',
})``;

export default App;
