import {matchRoutes, useLocation} from 'react-router-dom';

type NavLinkProps = {
  matchEnd?: boolean;
  to: string;
  render: (selected: boolean) => React.ReactElement;
};

const NavLink = ({to, matchEnd = true, ...props}: NavLinkProps) => {
  const {pathname} = useLocation();

  const matches = matchEnd
    ? matchRoutes([{path: to}], pathname) !== null
    : matchRoutes([{path: to}], '/network/' + pathname.split('/')[2]) !== null;

  return props.render(matches);
};

export default NavLink;
