import React from 'react';
import AccountSetup from '../../features/AccountSetup';
import { useAuthState } from '../../features/Auth';
import { MainLayout } from '../../Layout';

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuthState();
  return user?.setupAccountProgress === -1 && user.role.code === 'practitioner' ? (
    <MainLayout />
  ) : (
    <AccountSetup />
  );
  // return <MainLayout />
};

export default AuthenticatedApp;
