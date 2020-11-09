import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
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
      <div
        style={{ display: 'flex', alignItems: 'center', height: '100%' }}
        className={`menu-item ${collapsed ? 'collapsed' : ''} ${pathname === path ? 'active' : ''}`}
      >
        <Icon name={iconName} size={24} style={{ marginRight: 24, overflow: 'initial' }} />
        <Text className="menu-item-title"> {title}</Text>
        <Link to={path} />
      </div>
    </Menu.Item>
  );
};

export default MenuItem;
