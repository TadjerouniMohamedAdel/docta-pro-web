import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu as AntMenu } from 'antd';
import MenuItem from './MenuItem/MenuItem';
import { ProtectedComponent } from '../../Auth';

const Menu: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <AntMenu theme="light" mode="inline" selectedKeys={[pathname]} defaultSelectedKeys={[pathname]}>
      <ProtectedComponent accessCode="doctor_profile/settings">
        <MenuItem title={t('doctor profile')} iconName="hospital-line" path="/settings" exact />
      </ProtectedComponent>
      <ProtectedComponent accessCode="availability/settings">
        <MenuItem
          title={t('Availability')}
          iconName="calendar-event-line"
          path="/settings/schedule"
        />
      </ProtectedComponent>
      <ProtectedComponent accessCode="reasons/settings">
        <MenuItem
          title={t('consultation reasons')}
          iconName="first-aid-kit-line"
          path="/settings/visit-reasons"
        />
      </ProtectedComponent>
      <ProtectedComponent accessCode="subscription/settings">
        <MenuItem
          title={t('subscription')}
          iconName="bank-card-line"
          path="/settings/subscription"
        />
      </ProtectedComponent>
      <ProtectedComponent accessCode="users_roles/settings">
        <MenuItem title={t('users')} iconName="shield-user-line" path="/settings/users" />
      </ProtectedComponent>
      <MenuItem
        title={t('password & login')}
        iconName="lock-2-line"
        path="/settings/password-login"
      />
    </AntMenu>
  );
};

export default Menu;
