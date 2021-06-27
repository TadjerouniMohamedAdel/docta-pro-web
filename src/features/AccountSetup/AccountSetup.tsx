import React from 'react';
import { useAuthState } from '../Auth';
import { SetupAccountProvider } from './context';
import './styles.less';
import {
  Availability,
  CabinetInfo,
  DoctorProfile1,
  DoctorProfile2,
  ResetPassword,
  VisitReasons,
} from './views';

const AccountSetup: React.FC = () => {
  const { user } = useAuthState();

  return (
    <SetupAccountProvider setupAccountProgress={user?.setupAccountProgress}>
      <DoctorProfile1 />
      <DoctorProfile2 />
      <CabinetInfo />
      <Availability />
      <VisitReasons />
      <ResetPassword />
    </SetupAccountProvider>
  );
};

export default AccountSetup;
