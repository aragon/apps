import React from 'react';

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

  // Temporary route to test breadcrumbs
  {
    name: 'Temp Finance subroute',
    path: Finance + '/abc',
    component: FinancePage,
    exact: true,
    breadcrumb: 'Temp Finance Subroute',
  },
  {
    name: 'Dashboard',
    path: Dashboard,
    component: HomePage,
    exact: true,
  },

  /**
   * Note: Specific NotFound route being used to
   * easily disable breadcrumbs on routes that aren't found.
   * Using '*' will match all paths and disable breadcrumbs entirely
   */
  {
    name: 'NotFound',
    path: NotFound,
    component: NotFoundPage,
    exact: true,
  },
];
