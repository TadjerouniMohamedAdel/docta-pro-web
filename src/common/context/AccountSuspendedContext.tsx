import React, { useState, useEffect } from 'react';

type ContextProps = {
  suspended: boolean;
  setSuspended: React.Dispatch<React.SetStateAction<boolean>>;
};
const contextDefaultValues: ContextProps = {
  suspended: JSON.parse(window.localStorage.getItem('suspended')!) || false,
  setSuspended: () => { }
};
export const AccountSuspendedContext = React.createContext<ContextProps>(contextDefaultValues);

const AccountSuspendedProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [suspended, setSuspended] = useState<boolean>(contextDefaultValues.suspended);

  useEffect(() => {
    window.localStorage.setItem('suspended', JSON.stringify(suspended));
  }, [suspended]);


  return (
    <AccountSuspendedContext.Provider value={{ suspended, setSuspended }}>{children}</AccountSuspendedContext.Provider>
  );
};
export default AccountSuspendedProvider;

