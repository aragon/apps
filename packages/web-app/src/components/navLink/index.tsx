import React from 'react';
import {useHistory} from 'react-router-dom';

type NavLinkProps = {
  // TODO: Investigate Type
  component: any;
  icon: React.ReactElement;
  label: string;
  to: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({
  component,
  icon,
  label,
  to,
  onClick,
}) => {
  const history = useHistory();

  const handleClick = () => {
    if (history.location.pathname !== to) {
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
    isSelected: to === history.location.pathname,
  };
  return React.createElement(component, props);
};

export default NavLink;
