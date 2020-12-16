import React, { useEffect, useState } from 'react';
import { useAuthState } from '../context';

type Props = {
  children: React.ReactNode;
  type?: 'section' | 'permission';
  accessCode: string;
};

const ProtectedComponent: React.FC<Props> = ({
  children,
  type = 'permission',
  accessCode,
  ...rest
}) => {
  const { user } = useAuthState();
  const [accessible, setAccessible] = useState(false);

  const CheckAccess = () => {
    if (user) {
      switch (type) {
        case 'section':
          if (user.permissions.find((item) => item.section.code === accessCode))
            setAccessible(true);
          break;

        case 'permission':
          if (user.permissions.find((item) => item.code === accessCode)) setAccessible(true);
          break;

        default:
          break;
      }
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
