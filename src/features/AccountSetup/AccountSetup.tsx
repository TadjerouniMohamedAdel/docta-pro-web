import React from 'react';
import { useAuthState } from '../Auth';
import { SetupAccountProvider } from './context';
import './styles.less';
import { DoctorProfile1, DoctorProfile2 } from './views';
import Availability from './views/Availability/Availability';
import CabinetInfo from './views/CabinetInfo/CabinetInfo';
import ResetPassword from './views/ResetPassword/ResetPassword';
import VisitReasons from './views/VisitReasons/VisitReasons';

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
