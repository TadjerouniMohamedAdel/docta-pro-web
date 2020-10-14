import React from 'react';
import { Col, Row } from 'antd';
import { bool, func } from 'prop-types';
import SidebarCollapser from './components/SidebarCollapser/SidebarCollapser';
import SidebarToggler from './components/SidebarToggler/SidebarToggler';
import UserProfile from './components/UserProfile/UserProfile';
import Localization from './components/Localization';

const propTypes = {
  collapsed: bool.isRequired,
  handleCollapsed: func.isRequired,
  setToggled: func.isRequired,
};
const Header = ({ handleCollapsed, collapsed, setToggled }) => {
  return (
    <header
      className="header"
      style={{ display: 'flex', alignItems: 'center', padding: 20 }}
    >
      <Row
        style={{ width: '100%', alignItems: 'center' }}
        justify="space-between"
      >
        <Col flex="auto">
          <SidebarCollapser
            handleCollapsed={handleCollapsed}
            collapsed={collapsed}
          />
          <SidebarToggler setToggled={setToggled} />
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

Header.propTypes = propTypes;

export default Header;
