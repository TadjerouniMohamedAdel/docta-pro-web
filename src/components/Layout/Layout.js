import React, { useState } from 'react';
import { Header, Sidebar, Content, Footer, Overlay } from './components';

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="layout has-sidebar">
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
