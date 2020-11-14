import { Col, Row } from 'antd';
import React from 'react';
import './styles.less';

export type Props = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

const Tab: React.FC<Props> = ({ children, icon, ...rest }) => {
  return (
    <div {...rest}>
      <Row gutter={10}>
        <Col style={{ display: 'flex', alignItems: 'center' }}>{icon ?? null}</Col>
        <Col>{children}</Col>
      </Row>
    </div>
  );
};

export default Tab;
