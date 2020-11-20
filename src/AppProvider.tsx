import React from 'react';
import { AuthProvider } from './features/Auth/context';
import { LocaleProvider } from './i18n';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LocaleProvider>
      <AuthProvider>{children}</AuthProvider>
    </LocaleProvider>
  );
};

export default AppProvider;
