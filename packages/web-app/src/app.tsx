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
import {NotFound} from 'utils/paths';
import DaoSelectMenu from 'containers/navbar/daoSelectMenu';
import {Loading} from 'components/temporary/loading';

const ExplorePage = lazy(() => import('pages/explore'));
const NotFoundPage = lazy(() => import('pages/notFound'));

const DashboardPage = lazy(() => import('pages/dashboard'));
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
  // TODO this needs to be inside a Routes component. Will be moved there with
  // further refactoring of layout (see further below).
  const {pathname} = useLocation();

  useEffect(() => {
    trackPage(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* TODO: replace with loading indicator */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route path=":network/:dao">
            <Route element={<DaoLayout />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="finance" element={<FinancePage />} />
              <Route path="finance/new-deposit" element={<NewDepositPage />} />
              <Route
                path="finance/new-withdraw"
                element={<NewWithdrawPage />}
              />
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
          <Route path={NotFound} element={<NotFoundPage />} />
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

  return <Navigate to={NotFound} state={{incorrectPath: pathname}} replace />;
};

// TODO the layout/background structure for the application will be
// refactored even further in a separate PR. This will also take care of
// the navbar width/position issue.

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
