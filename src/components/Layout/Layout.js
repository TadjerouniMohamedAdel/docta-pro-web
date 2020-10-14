import React, { useState } from 'react';
import { Header, Sidebar, Content, Footer, Overlay } from './components';
import { useLocaleState } from './components/Header/components/Localization';

const Layout = () => {
  const { locale } = useLocaleState();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`layout has-sidebar ${locale === 'ar' ? 'rtl' : ''}`}>
      <Sidebar collapsed={collapsed} toggled={toggled} />
      <Overlay setToggled={setToggled} />
      <div className="layout">
        <Header
          handleCollapsed={handleCollapsed}
          collapsed={collapsed}
          setToggled={setToggled}
        />
        <Content />
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
