import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { AuthProvider } from './features/Auth/context';
import { LocaleProvider } from './i18n';

const AppProvider: React.FC = ({ children }) => {
  const queryCache = new QueryCache();
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <LocaleProvider>
        <AuthProvider>{children}</AuthProvider>
      </LocaleProvider>
    </ReactQueryCacheProvider>
  );
};

export default AppProvider;
