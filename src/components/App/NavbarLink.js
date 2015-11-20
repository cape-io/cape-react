import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const NavbarLink = ({to, className, component, children}) => {
  const Comp = component || Link;

  return (
    <Comp to={to} className={className} activeStyle={{
      color: '#33e0ff',
    }}>
      {children}
    </Comp>
  );
};

NavbarLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  component: PropTypes.node,
  to: PropTypes.string.isRequired,
};

export default NavbarLink;
