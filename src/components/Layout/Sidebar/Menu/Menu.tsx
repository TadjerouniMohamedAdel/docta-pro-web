import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import MenuItem from './MenuItem/MenuItem';
import ProtectedComponent from '../../../../features/Auth/ProtectedComponent/ProtectedComponent';

type Props = {
  collapsed: boolean;
};

const Menu: React.FC<Props> = ({ collapsed }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <AntMenu
      theme="light"
      mode="inline"
      inlineCollapsed={collapsed}
      selectedKeys={[pathname]}
      defaultSelectedKeys={[pathname]}
      style={{ padding: '24px 0' }}
    >
      <MenuItem
        title={t('overview')}
        iconName="dashboard-3-line"
        path="/"
        collapsed={collapsed}
        exact
      />
      <MenuItem
        title={t('appointments')}
        iconName="calendar-2-line"
        path="/appointments"
        collapsed={collapsed}
      />
      <MenuItem
        title={t('patients')}
        iconName="group-line"
        path="/patients"
        collapsed={collapsed}
      />
      <ProtectedComponent accessCode="settings" type="section">
        <MenuItem
          title={t('settings')}
          iconName="settings-line"
          path="/settings"
          collapsed={collapsed}
        />
      </ProtectedComponent>
    </AntMenu>
  );
};

export default Menu;
