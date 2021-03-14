import React, { useEffect, useState } from 'react';
import { useCheckAccess } from '../hooks';
import { AccessCode } from '../types';

type Props = {
  children: React.ReactNode;
  type?: 'section' | 'permission';
  accessCode: AccessCode;
};

const ProtectedComponent: React.FC<Props> = ({
  children,
  type = 'permission',
  accessCode,
  ...rest
}) => {
  const [accessible, setAccessible] = useState(false);

  const { CheckAccess } = useCheckAccess(type, accessCode);

  useEffect(() => {
    setAccessible(CheckAccess());
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
