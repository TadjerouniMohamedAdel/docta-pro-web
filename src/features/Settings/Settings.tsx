import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch } from 'react-router-dom';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import ProtectedComponent from '../Auth/ProtectedComponent/ProtectedComponent';
import Menu from './Menu/Menu';
import Users from './Users';

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
          <ProtectedComponent accessCode="users_roles/settings">
            <Route path="/settings/users" component={Users} />
          </ProtectedComponent>
        </Switch>
      </InnerContent>
    </InnerLayout>
  );
};

export default Settings;
