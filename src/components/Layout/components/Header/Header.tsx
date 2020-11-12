import React from 'react';
import { Col, Row } from 'antd';
import UserProfile from './components/UserProfile/UserProfile';
import SidebarCollapser from './components/SidebarCollapser/SidebarCollapser';
import SidebarToggler from './components/SidebarToggler/SidebarToggler';
import Localization from './components/Localization';
import Search from './components/Search/Search';

type Props = {
  handleCollapsed: () => void;
  handleToggled: (value: boolean) => void;
  collapsed: boolean;
};

const Header: React.FC<Props> = ({ handleCollapsed, handleToggled, collapsed }) => {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
      <Row style={{ width: '100%' }} justify="space-between" align="middle">
        <Col flex={1}>
          <Row align="middle" gutter={15}>
            <Col>
              <SidebarCollapser handleCollapsed={handleCollapsed} collapsed={collapsed} />
              <SidebarToggler handleToggled={handleToggled} />
            </Col>
            <Col flex="auto">
              <Search />
            </Col>
          </Row>
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
