import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context';

type Props = {
  children: React.ReactNode;
  accessCode: string;
};

const ProtectedComponent: React.FC<Props> = ({ children, accessCode, ...rest }) => {
  const { user } = useAuthState();
  const [accessible, setAccessible] = useState(false);

  const CheckAccess = () => {
    if (user) {
      const permission = user.permissions.find((item) => item.code === accessCode);
      if (permission) setAccessible(true);
    }
  };

  useEffect(() => {
    CheckAccess();
  }, []);

  return (
    <>
      {accessible
        ? React.Children.map(children, (child) =>
            React.cloneElement(child as React.ReactElement, { ...rest }),
          )
        : null}
    </>
  );
};

export default ProtectedComponent;
