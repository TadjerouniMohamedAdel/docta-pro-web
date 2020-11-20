import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import Header from './Header/Header';
import { useLocaleState } from './Header/Localization';
import Overlay from './Overlay/Overlay';
import Sidebar from './Sidebar/Sidebar';

const Layout: React.FC = () => {
  const { locale } = useLocaleState();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  const handleToggled = (value: boolean): void => {
    setToggled(value);
  };

  return (
    <div className={`layout main-layout has-sidebar ${locale === 'ar' ? 'rtl' : ''}`}>
      <Sidebar collapsed={collapsed} toggled={toggled} />
      <Overlay handleToggled={handleToggled} />
      <div className="layout">
        <Header
          handleCollapsed={handleCollapsed}
          collapsed={collapsed}
          handleToggled={handleToggled}
        />
        <Content />
      </div>
    </div>
  );
};

export default Layout;
