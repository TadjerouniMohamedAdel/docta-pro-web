import React from 'react';
import { useAuthState } from '../Auth';
import { SetupAccountProvider } from './context';
import './styles.less';
import { DoctorProfile1, DoctorProfile2 } from './views';
import CabinetInfo from './views/CabinetInfo/CabinetInfo';

type Props = {};

const AccountSetup: React.FC<Props> = () => {
  const { user } = useAuthState();

  return (
    <SetupAccountProvider setupAccountProgress={user?.setupAccountProgress}>
      <DoctorProfile1 />
      <DoctorProfile2 />
      <CabinetInfo />
    </SetupAccountProvider>
  );
};

export default AccountSetup;
