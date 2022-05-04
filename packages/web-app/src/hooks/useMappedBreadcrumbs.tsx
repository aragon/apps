import {
  IconDashboard,
  IconCommunity,
  IconFinance,
  IconGovernance,
  IconSettings,
} from '@aragon/ui-components';
import React from 'react';
import useBreadcrumbs, {BreadcrumbData} from 'use-react-router-breadcrumbs';

import {Dashboard, NotFound} from 'utils/paths';

type MappedBreadcrumbs = {
  breadcrumbs: {
    path: string;
    label: string;
  }[];
  icon: JSX.Element;
};

function basePathIcons(path: string) {
  if (path.includes('dashboard')) return <IconDashboard />;
  if (path.includes('community')) return <IconCommunity />;
  if (path.includes('finance')) return <IconFinance />;
  if (path.includes('settings')) return <IconSettings />;
  else return <IconGovernance />;
}

export function useMappedBreadcrumbs(): MappedBreadcrumbs {
  const breadcrumbs = useBreadcrumbs(undefined, {
    excludePaths: [
      Dashboard,
      NotFound,
      '/:ethereum/:dao/governance/proposals',
      '/:ethereum/:dao/',
      '/:ethereum/',
      '/',
    ],
  }).map((item: BreadcrumbData<string>) => ({
    path: item.match.pathname,
    label: item.breadcrumb as string,
  }));
  const icon = breadcrumbs[0]
    ? basePathIcons(breadcrumbs[0].path)
    : basePathIcons('governance');
  return {breadcrumbs, icon};
}
