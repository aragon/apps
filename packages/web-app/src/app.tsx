import styled from 'styled-components';
import React, {useEffect, lazy, Suspense} from 'react';

// FIXME: Change route to ApmRoute once package has been updated to be
// compatible with react-router-dom v6
import {Navigate, Routes, Route, useLocation, Outlet} from 'react-router-dom';

import Navbar from 'containers/navbar';
import {WalletMenu} from 'containers/navbar/walletMenu';
import {trackPage} from 'services/analytics';
import '../i18n.config';

// HACK: All pages MUST be exported with the withTransaction function
// from the '@elastic/apm-rum-react' package in order for analytics to
// work properly on the pages.
import * as paths from 'utils/paths';
import DaoSelectMenu from 'containers/navbar/daoSelectMenu';

const ExplorePage = lazy(() => import('pages/explore'));
const NotFoundPage = lazy(() => import('pages/notFound'));

const FinancePage = lazy(() => import('pages/finance'));
const GovernancePage = lazy(() => import('pages/governance'));
const CommunityPage = lazy(() => import('pages/community'));
const SettingsPage = lazy(() => import('pages/settings'));

const TokensPage = lazy(() => import('pages/tokens'));
const TransfersPage = lazy(() => import('pages/transfers'));
const NewDepositPage = lazy(() => import('pages/newDeposit'));
const NewWithdrawPage = lazy(() => import('pages/newWithdraw'));

const NewProposalPage = lazy(() => import('pages/newProposal'));
const ProposalPage = lazy(() => import('pages/proposal'));

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    trackPage(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* TODO: replace with loading indicator */}
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path=":network/:dao">
            <Route element={<DaoLayout />}>
              <Route path="finance" element={<FinancePage />} />
              <Route path="finance/deposit" element={<NewDepositPage />} />
              <Route path="finance/withdraw" element={<NewWithdrawPage />} />
              <Route path="finance/tokens" element={<TokensPage />} />
              <Route path="finance/transfers" element={<TransfersPage />} />
              <Route path="governance" element={<GovernancePage />} />
              <Route
                path="governance/new-proposal"
                element={<NewProposalPage />}
              />
              <Route
                path="governance/proposal/:id"
                element={<ProposalPage />}
              />
              <Route path="community" element={<CommunityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path={paths.NotFound} element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundWrapper />} />
        </Routes>
      </Suspense>
      <DaoSelectMenu />
      <WalletMenu />
    </>
  );
}

const NotFoundWrapper: React.FC = () => {
  const {pathname} = useLocation();
  console.log('[LOGGING] pathname ' + pathname);

  return (
    <Navigate to={paths.NotFound} state={{incorrectPath: pathname}} replace />
  );
};

// Components that are rendered via the Route element prop need to be expressed
// called via the Outlet component. Calling them as children does not work. This
// why simply passing Layout won't work.
const DaoLayout: React.FC = () => (
  <>
    <Navbar />
    <Background>
      <Layout>
        <Outlet />
      </Layout>
    </Background>
  </>
);

const Background = styled.div.attrs({
  className: 'flex flex-col mb-14 desktop:mb-10 bg-ui-50',
})``;

export const Layout = styled.main.attrs({
  className:
    'grid grid-cols-4 tablet:grid-cols-8 ' +
    'desktop:grid-cols-12 gap-x-2 desktop:gap-x-3 ' +
    'wide:gap-x-4 mx-2 tablet:mx-3 desktop:mx-5 wide:mx-auto wide:w-190',
})``;

export default App;
