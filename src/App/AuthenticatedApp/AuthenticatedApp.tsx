import React from 'react';
import { Modal } from 'antd';
import { AccountSuspendedContext } from '../../common/context/AccountSuspendedContext';
import AccountSuspended from '../../components/AccountSuspended/AccountSuspended';
import AccountSetup from '../../features/AccountSetup';
import { useAuthState } from '../../features/Auth';
import { MainLayout } from '../../Layout';
import AccountLocked from '../../components/AccountLocked/AccountLocked';
import { AccountLockedContext } from '../../common/context/AccountLockedContext';

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuthState();
  const { suspended } = React.useContext(AccountSuspendedContext);
  const { locked } = React.useContext(AccountLockedContext);

  return (
    <>
      <Modal visible={suspended} footer={null} centered width={600} closable={false}>
        <AccountSuspended />
      </Modal>
      <AccountLocked isLocked={locked} />
      {user?.setupAccountProgress === -1 || user?.role.code !== 'practitioner' ? (
        <MainLayout />
      ) : (
        <AccountSetup />
      )}
    </>
  );
};

export default AuthenticatedApp;
