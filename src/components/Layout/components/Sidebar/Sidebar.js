import React from 'react';
import { bool } from 'prop-types';
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';

const propTypes = {
  collapsed: bool.isRequired,
  toggled: bool.isRequired,
};

const Sidebar = ({ collapsed, toggled }) => {
  return (
    <aside
      className={`sidebar break-point-md ${collapsed ? 'collapsed' : ''} ${
        toggled ? 'toggled' : ''
      }`}
    >
      <Logo />
      <Menu />
    </aside>
  );
};

Sidebar.propTypes = propTypes;

export default Sidebar;
