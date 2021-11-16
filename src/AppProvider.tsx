import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AccountSuspendedProvider from './common/context/AccountSuspendedContext';
import { AppLoader } from './components';
import { AuthProvider } from './features/Auth/context';
import i18n from './i18n';

const AppProvider: React.FC = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <React.Suspense fallback={<AppLoader />}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AccountSuspendedProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </AccountSuspendedProvider>
        </I18nextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Suspense>
  );
};

export default AppProvider;
