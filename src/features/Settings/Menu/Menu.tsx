import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import MenuItem from './MenuItem/MenuItem';
import ProtectedComponent from '../../Auth/ProtectedComponent/ProtectedComponent';

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
      <ProtectedComponent accessCode="users_roles/settings">
        <MenuItem title={t('users')} iconName="shield-user-line" path="/settings/users" />
      </ProtectedComponent>
    </AntMenu>
  );
};

export default Menu;
