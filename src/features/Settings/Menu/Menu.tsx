import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import MenuItem from './MenuItem/MenuItem';

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <AntMenu
      theme="light"
      mode="inline"
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      style={{ padding: '24px 0' }}
    >
      <MenuItem
        title={t('working hours')}
        iconName="calendar-event-line"
        path="/settings/working-hours"
      />
      <MenuItem title={t('users')} iconName="shield-user-line" path="/settings/users" />
    </AntMenu>
  );
};

export default Menu;
