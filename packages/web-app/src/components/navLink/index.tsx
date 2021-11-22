import React from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';

type NavLinkProps = {
  // TODO: Investigate Type
  Component: any;
  icon: React.ReactElement;
  label: string;
  to: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  Component,
  icon,
  label,
  to,
  onClick,
}) => {
  const history = useHistory();
  const isMatch = useRouteMatch({path: to, exact: true});

  const handleClick = () => {
    if (!isMatch) {
      history.push(to);
    }

    if (onClick) {
      onClick();
    }
  };

  const props = {
    icon,
    label,
    onClick: handleClick,
    isSelected: isMatch,
  };
  return <Component {...props} />;
};

export default NavLink;
