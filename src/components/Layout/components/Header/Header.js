import { Col, Row } from 'antd';
import React from 'react';
import UserProfile from './components/UserProfile/UserProfile';

const Header = () => {
  return (
    <header
      className="header"
      style={{ display: 'flex', alignItems: 'center', padding: 20 }}
    >
      <Row align="middle" style={{ marginLeft: 'auto' }}>
        <Col>
          <UserProfile />
        </Col>
      </Row>
    </header>
  );
};

export default Header;
