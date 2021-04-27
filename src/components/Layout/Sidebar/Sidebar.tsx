import React from 'react';
import Localization from './Localization';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

type Props = {
  collapsed: boolean;
  toggled: boolean;
};

const Sidebar: React.FC<Props> = ({ collapsed, toggled }) => {
  return (
    <aside
      className={`sidebar break-point-xl ${collapsed ? 'collapsed' : ''} ${
        toggled ? 'toggled' : ''
      }`}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <div>
        <Logo collapsed={collapsed} />
        <Menu collapsed={collapsed} />
      </div>
      <div style={{ padding: '10px 30px' }}>
        <Localization />
      </div>
    </aside>
  );
};

export default Sidebar;
