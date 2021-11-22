import HomePage from 'pages/home';
import FinancePage from 'pages/finance';
import NotFoundPage from 'pages/notFound';
import {Dashboard, Finance, NotFound} from 'utils/paths';

export type PageRoute = {
  exact: boolean;
  name: string;
  path: string;
  component: React.FC;
  breadcrumb?: string;
};

// Note that order matters if all routes aren't exact
export const routes: PageRoute[] = [
  {
    name: 'Finance',
    path: Finance,
    component: FinancePage,
    exact: true,
  },
  {
    name: 'Dashboard',
    path: Dashboard,
    component: HomePage,
    exact: true,
  },
  {
    name: 'NotFound',
    path: NotFound,
    component: NotFoundPage,
    exact: false,
  },
];
