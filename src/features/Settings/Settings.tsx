import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import VisitReasons from './VisitReasons';
import ProtectedRoute from '../Auth/ProtectedRoute/ProtectedRoute';
import DoctorProfile from './DoctorProfile';
import Menu from './Menu/Menu';
import Users from './Users';
import Schedule from './Schedule';

type Props = {};

const Settings: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  return (
    <InnerLayout>
      <InnerSidebar>
        <div style={{ padding: '18px 24px' }}>
          <Text size="xxl" style={{ fontWeight: 'bold' }}>
            {t('settings')}
          </Text>
        </div>
        <div>
          <Menu />
        </div>
      </InnerSidebar>
      <InnerContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Switch>
          <ProtectedRoute
            accessCode="clinic_profile/settings"
            path="/settings"
            component={DoctorProfile}
          />
          <Route path="/settings/visit-reasons" component={VisitReasons} />
          <Route path="/settings/schedule" component={Schedule} />
          <ProtectedRoute
            accessCode="users_roles/settings"
            path="/settings/users"
            component={Users}
          />
        </Switch>
      </InnerContent>
    </InnerLayout>
  );
};

export default Settings;
