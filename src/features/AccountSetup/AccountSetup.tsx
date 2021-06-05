import React from 'react';
import { useAuthState } from '../Auth';
import { SetupAccountProvider } from './context';
import './styles.less';
import { DoctorProfile1, DoctorProfile2 } from './views';
import Availability from './views/Availability/Availability';
import CabinetInfo from './views/CabinetInfo/CabinetInfo';
import VisitReasons from './views/VisitReasons/VisitReasons';

type Props = {};

const AccountSetup: React.FC<Props> = () => {
  const { user } = useAuthState();

  return (
    <SetupAccountProvider setupAccountProgress={user?.setupAccountProgress}>
      <DoctorProfile1 />
      <DoctorProfile2 />
      <CabinetInfo />
      <Availability />
      <VisitReasons />
    </SetupAccountProvider>
  );
};

export default AccountSetup;
