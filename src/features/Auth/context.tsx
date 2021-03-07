import React, { useState } from 'react';
import { User } from './types';

type ContextProps = {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const AuthStateContext = React.createContext<ContextProps | undefined>(undefined);

export const AuthProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <AuthStateContext.Provider value={{ user, setUser }}>{children}</AuthStateContext.Provider>
  );
};

export const useAuthState = (): ContextProps => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return { ...context };
};
