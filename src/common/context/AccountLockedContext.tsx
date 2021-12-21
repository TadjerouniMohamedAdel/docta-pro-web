import React, { useState, useEffect } from 'react';

type ContextProps = {
  locked: boolean | 'pending';
  setLocked: React.Dispatch<React.SetStateAction<boolean | 'pending'>>;
};
const contextDefaultValues: ContextProps = {
  locked: JSON.parse(window.localStorage.getItem('locked')!) || false,
  setLocked: () => {},
};
export const AccountLockedContext = React.createContext<ContextProps>(contextDefaultValues);

const AccountLockedProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locked, setLocked] = useState<boolean | 'pending'>(contextDefaultValues.locked);

  useEffect(() => {
    window.localStorage.setItem('locked', JSON.stringify(locked));
  }, [locked]);

  return (
    <AccountLockedContext.Provider value={{ locked, setLocked }}>
      {children}
    </AccountLockedContext.Provider>
  );
};
export default AccountLockedProvider;
