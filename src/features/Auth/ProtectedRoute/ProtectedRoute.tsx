import React, { useEffect, useState } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useCheckAccess } from '../hooks';

type Props = RouteProps & {
  type?: 'section' | 'permission';
  accessCode: string;
};

const ProtectedRoute: React.FC<Props> = ({
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

  return <>{accessible ? <Route {...rest} /> : null}</>;
};

export default ProtectedRoute;
