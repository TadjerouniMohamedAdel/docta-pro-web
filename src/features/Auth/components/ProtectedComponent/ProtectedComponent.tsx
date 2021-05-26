import React, { useEffect, useState } from 'react';
import { useCheckAccess } from '../../hooks';
import { AccessCode } from '../../types';

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

  const { CheckAccess } = useCheckAccess();

  useEffect(() => {
    setAccessible(CheckAccess(type, accessCode));
  }, []);

  const childNodes = React.Children.toArray(children)?.filter(Boolean) as React.ReactElement[];

  return <>{accessible ? childNodes.map((node) => React.cloneElement(node, { ...rest })) : null}</>;
};

export default ProtectedComponent;
