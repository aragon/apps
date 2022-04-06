import {
  IconDashboard,
  IconCommunity,
  IconFinance,
  IconGovernance,
} from '@aragon/ui-components';
import React from 'react';
import useBreadcrumbs, {BreadcrumbData} from 'use-react-router-breadcrumbs';

import {Dashboard, NotFound} from 'utils/paths';
import {Nullable} from 'utils/types';

type MappedBreadcrumbs = {
  breadcrumbs: {
    path: string;
    label: string;
  }[];
  icon: Nullable<JSX.Element>;
};

function basePathIcons(path: string) {
  if (path.includes('dashboard')) return <IconDashboard />;
  if (path.includes('community')) return <IconCommunity />;
  if (path.includes('finance')) return <IconFinance />;
  if (path.includes('governance')) return <IconGovernance />;
  return null;
}

export function useMappedBreadcrumbs(): MappedBreadcrumbs {
  const breadcrumbs = useBreadcrumbs(undefined, {
    excludePaths: [Dashboard, NotFound, 'governance/proposals', ':ethereum/'],
  }).map((item: BreadcrumbData<string>) => {
    return {
      path: item.match.pathname,
      label: item.breadcrumb as string,
    };
  });
  const icon = breadcrumbs[0] ? basePathIcons(breadcrumbs[0].path) : null;
  return {breadcrumbs, icon};
}
