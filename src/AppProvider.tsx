import React from 'react';
import { LocaleProvider } from './components/Layout/components/Header/components/Localization';
import { AuthProvider } from './features/Auth/context';

const AppProvider: React.FC = ({ children }) => {
  return (
    <LocaleProvider>
      <AuthProvider>{children}</AuthProvider>
    </LocaleProvider>
  );
};

export default AppProvider;
