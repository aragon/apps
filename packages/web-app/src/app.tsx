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
import ExplorePage from 'pages/explore';
import * as paths from 'utils/paths';
import DaoSelectMenu from 'containers/navbar/daoSelectMenu';

const FinancePage = lazy(() => import('pages/finance'));
const GovernancePage = lazy(() => import('pages/governance'));
const CommunityPage = lazy(() => import('pages/community'));
const NotFoundPage = lazy(() => import('pages/notFound'));

function App() {
  const {pathname} = useLocation();

  useEffect(() => {
    trackPage(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col mb-14 desktop:mb-10 bg-ui-50">
      {/* TODO: replace with loading indicator */}
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          {/* Reintroduce code below */}
          {/* <Route element={<ExploreLayout />}>
          </Route> */}
          <Route element={<DaoLayout />}>
            <Route path=":network/:dao">
              <Route path="finance/*" element={<FinancePage />} />
              <Route path="governance/*" element={<GovernancePage />} />
              <Route path="community" element={<CommunityPage />} />
            </Route>
            <Route path={paths.NotFound} element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<Navigate to={paths.NotFound} replace />} />
        </Routes>
      </Suspense>
      <DaoSelectMenu />
      <WalletMenu />
    </div>
  );
}

// const ExploreLayout: React.FC = () => (
//   <>
//     {/* Replace Navbar with explorer Navbar */}
//     <Navbar />
//     <LayoutRoute />
//   </>
// );

const DaoLayout: React.FC = () => (
  <>
    <Navbar />
    <LayoutRoute />
  </>
);

// Components that are rendered via the Route element prop need to be expressed
// called via the Outlet component. Calling them as children does not work. This
// why simply passing Layout won't work.
const LayoutRoute: React.FC = () => (
  <Layout>
    <Outlet />
  </Layout>
);

export const Layout = styled.main.attrs({
  className:
    'grid grid-cols-4 tablet:grid-cols-8 ' +
    'desktop:grid-cols-12 gap-x-2 desktop:gap-x-3 ' +
    'wide:gap-x-4 mx-2 tablet:mx-3 desktop:mx-5 wide:mx-auto wide:w-190',
})``;

export default App;
