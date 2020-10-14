import React from 'react';
import { LocaleProvider } from './components/Layout/components/Header/components/Localization';
import { AuthProvider } from './features/Auth/context';

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  return (
    <LocaleProvider>
      <AuthProvider>{children}</AuthProvider>
    </LocaleProvider>
  );
};

export default AppProvider;
