import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Menu, Row } from 'antd';
import { MenuItemProps } from 'antd/lib/menu/MenuItem';
import Icon from '../../../../../../Icon/Icon';
import Text from '../../../../../../Text/Text';
import './styles.less';

type Props = Omit<MenuItemProps, 'key'> & {
  collapsed: boolean;
  iconName: string;
  title: string;
  path: string;
};

const MenuItem: React.FC<Props> = ({ collapsed, iconName, title, path, ...rest }) => {
  const { pathname } = useLocation();

  return (
    <Menu.Item
      key={path}
      title=""
      style={{ display: 'flex', alignItems: 'center', height: 64 }}
      {...rest}
    >
      <Row
        style={{ height: '100%' }}
        className={`menu-item ${collapsed ? 'collapsed' : ''} ${pathname === path ? 'active' : ''}`}
        align="middle"
        gutter={24}
        wrap={false}
      >
        <Col style={{ display: 'flex' }}>
          <Icon name={iconName} size={24} style={{ overflow: 'initial' }} />
        </Col>
        <Col>
          <Text className="menu-item-title" style={{ fontWeight: 500 }}>
            {title}
          </Text>
        </Col>
      </Row>
      <Link to={path} />
    </Menu.Item>
  );
};

export default MenuItem;
