import React, {useCallback} from 'react';
import {useMatch, useNavigate, useResolvedPath} from 'react-router-dom';

type NavLinkProps = {
  to: string;
  renderItem: (isActive: boolean, onClick: () => void) => JSX.Element;
  selected?: string;
  onClick?: () => void;
};

const NavLink = ({to, onClick, selected, renderItem}: NavLinkProps) => {
  const resolved = useResolvedPath(to);
  const isMatch = useMatch({path: resolved.pathname, end: true});
  const navigate = useNavigate();

  const getSelected = useCallback(() => {
    return (selected ? selected === to : isMatch) as boolean;
  }, [isMatch, selected, to]);

  const handleClick = () => {
    if (onClick) onClick();
    navigate(to);
  };
  return <>{renderItem(getSelected(), handleClick)}</>;
};

export default NavLink;
