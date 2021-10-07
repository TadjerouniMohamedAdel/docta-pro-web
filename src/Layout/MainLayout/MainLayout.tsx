import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header/Header';
import Overlay from './Overlay/Overlay';
import Sidebar from './Sidebar/Sidebar';
import Content from './Content/Content';

const MainLayout: React.FC = () => {
  const { i18n } = useTranslation();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [toggled, setToggled] = useState<boolean>(false);

  const handleCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  const handleToggled = (value: boolean): void => {
    setToggled(value);
  };

  return (
    <div
      className={`layout main-layout fixed-sidebar fixed-header has-sidebar ${
        i18n.language === 'ar' ? 'rtl' : ''
      }`}
    >
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

export default MainLayout;
