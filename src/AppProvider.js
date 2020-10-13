import React from 'react';
import { AuthProvider } from './features/Auth/context';

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
