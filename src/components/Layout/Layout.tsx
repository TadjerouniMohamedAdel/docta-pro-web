import React, { useState } from 'react';
import { Content, Footer, Header, Overlay, Sidebar } from './components';
import { useLocaleState } from './components/Header/components/Localization';

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
    <div className={`layout has-sidebar ${locale === 'ar' ? 'rtl' : ''}`}>
      <Sidebar collapsed={collapsed} toggled={toggled} />
      <Overlay handleToggled={handleToggled} />
      <div className="layout">
        <Header
          handleCollapsed={handleCollapsed}
          collapsed={collapsed}
          handleToggled={handleToggled}
        />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
