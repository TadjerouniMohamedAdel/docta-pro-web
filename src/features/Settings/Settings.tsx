import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import { InnerLayout } from '../../Layout';
import Text from '../../components/Text/Text';
import VisitReasons from './views/VisitReasons';
import { ProtectedRoute } from '../Auth';
import DoctorProfile from './views/DoctorProfile';
import Menu from './Menu/Menu';
import Users from './views/Users';
import Schedule from './views/Schedule';
import PasswordLogin from './views/PasswordLogin';

type Props = {};

const Settings: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  return (
    <InnerLayout>
      <InnerLayout.Sidebar>
        <div style={{ padding: '18px 24px' }}>
          <Text size="xxl" style={{ fontWeight: 'bold' }}>
            {t('settings')}
          </Text>
        </div>
        <div>
          <Menu />
        </div>
      </InnerLayout.Sidebar>
      <InnerLayout.Content style={{ display: 'flex', flexDirection: 'column' }}>
        <Switch>
          <ProtectedRoute
            accessCode="doctor_profile/settings"
            path="/settings"
            component={DoctorProfile}
            exact
          />
          <ProtectedRoute
            accessCode="reasons/settings"
            path="/settings/visit-reasons"
            component={VisitReasons}
          />
          <ProtectedRoute
            accessCode="availability/settings"
            path="/settings/schedule"
            component={Schedule}
          />
          <ProtectedRoute
            accessCode="users_roles/settings"
            path="/settings/users"
            component={Users}
          />
          <Route path="/settings/password-login" component={PasswordLogin} />
        </Switch>
      </InnerLayout.Content>
    </InnerLayout>
  );
};

export default Settings;
