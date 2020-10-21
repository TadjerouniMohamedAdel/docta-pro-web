import React from 'react';
import { Col, Row } from 'antd';
import UserProfile from './components/UserProfile/UserProfile';
import SidebarCollapser from './components/SidebarCollapser/SidebarCollapser';
import SidebarToggler from './components/SidebarToggler/SidebarToggler';
import Localization from './components/Localization';

type Props = {
  handleCollapsed: () => void;
  handleToggled: (value: boolean) => void;
  collapsed: boolean;
};

const Header: React.FC<Props> = ({ handleCollapsed, handleToggled, collapsed }) => {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Row style={{ width: '100%', alignItems: 'center' }} justify="space-between">
        <Col flex="auto">
          <SidebarCollapser handleCollapsed={handleCollapsed} collapsed={collapsed} />
          <SidebarToggler handleToggled={handleToggled} />
        </Col>

        <Col>
          <Row align="middle">
            <Col>
              <Localization />
            </Col>
            <Col>
              <UserProfile />
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default Header;