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
    <AntMenu theme="light" mode="inline" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]}>
      <ProtectedComponent accessCode="clinic_profile/settings">
        <MenuItem title={t('doctor profile')} iconName="hospital-line" path="/settings" exact />
      </ProtectedComponent>
      <MenuItem
        title={t('Availability')}
        iconName="calendar-event-line"
        path="/settings/schedule"
      />
      <MenuItem
        title={t('Consultation Reasons')}
        iconName="first-aid-kit-line"
        path="/settings/visit-reasons"
      />
      <ProtectedComponent accessCode="users_roles/settings">
        <MenuItem title={t('users')} iconName="shield-user-line" path="/settings/users" />
      </ProtectedComponent>
    </AntMenu>
  );
};

export default Menu;
