import React, { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useCheckAccess } from '../hooks';
import { AccessCode } from '../types';

type Props = RouteProps & {
  type?: 'section' | 'permission';
  accessCode: AccessCode;
};

const ProtectedRoute: React.FC<Props> = ({
  children,
  type = 'permission',
  accessCode,
  ...rest
}) => {
  const [accessible, setAccessible] = useState(false);

  const { CheckAccess } = useCheckAccess();

  useEffect(() => {
    setAccessible(CheckAccess(type, accessCode));
  }, []);

  return <>{accessible ? <Route {...rest} /> : null}</>;
};

export default ProtectedRoute;
