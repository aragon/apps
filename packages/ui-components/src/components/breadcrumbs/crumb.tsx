import React from 'react';
import styled from 'styled-components';

import {BadgeProps} from '../badge';
import {IconDashboard, IconHome} from '../icons';

type CrumbProps = {
  first?: boolean;
  label: string;
  last?: boolean;
  path: string;
  tag?: React.FunctionComponentElement<BadgeProps>;
  onClick?: (to: string) => void;
};

const Crumb: React.FC<CrumbProps> = props => {
  return (
    <CrumbContainer
      {...(props.last ? {} : {onClick: () => props.onClick?.(props.path)})}
      className={props.last ? 'text-ui-600 cursor-default' : 'text-primary-500'}
    >
      {props.first && <IconHome className="desktop:w-2.5 desktop:h-2.5" />}
      <p>{props.label}</p>
      {props.last && props.tag}
    </CrumbContainer>
  );
};

export default Crumb;

const CrumbContainer = styled.button.attrs({
  className: 'flex items-center space-x-1 desktop:space-x-1.5' as string,
})``;
