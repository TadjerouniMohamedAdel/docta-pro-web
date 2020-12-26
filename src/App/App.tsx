import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import en from 'antd/es/locale/en_GB';
import ar from 'antd/es/locale/ar_EG';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryCache } from 'react-query';
import FullPageLoader from '../components/FullPageLoader';
import { useAuthState } from '../features/Auth/context';
import { useLocaleState } from '../i18n';
import { getCurrentUser } from '../features/Auth/services';
import { AuthResponse } from '../features/Auth/types';

const queryCache = new QueryCache();

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp/UnauthenticatedApp'));

function App() {
  const language = {
    ar,
    en,
  };

  const { user, setUser } = useAuthState();
  const { locale } = useLocaleState();
  const token = localStorage.getItem('token');

  const handleFetchCurrentUser = async (): Promise<void> => {
    try {
      const response: AuthResponse | undefined = await getCurrentUser();
      if (response) {
        setUser(response.data);
      }
    } catch (err) {
      console.log(err);
      queryCache.clear();
      localStorage.removeItem('token');
      window.location.assign(window.location as any);
    }
  };

  useEffect(() => {
    if (token && !user) handleFetchCurrentUser();
  }, []);

  return (
    <ConfigProvider
      locale={(language as any)[locale ?? 'en']}
      direction={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Router>
        {token && !user ? (
          <FullPageLoader />
        ) : (
          <React.Suspense fallback={<FullPageLoader />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </React.Suspense>
        )}
      </Router>
    </ConfigProvider>
  );
}

export default App;
