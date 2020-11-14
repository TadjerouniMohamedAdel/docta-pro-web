import React from 'react';
import Logo from './components/Logo/Logo';
import Menu from './components/Menu/Menu';

type Props = {
  collapsed: boolean;
  toggled: boolean;
};

const Sidebar: React.FC<Props> = ({ collapsed, toggled }) => {
  return (
    <aside
      className={`sidebar break-point-lg ${collapsed ? 'collapsed' : ''} ${
        toggled ? 'toggled' : ''
      }`}
    >
      <Logo />
      <Menu collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
