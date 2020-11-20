import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import en from 'antd/es/locale/en_GB';
import ar from 'antd/es/locale/ar_EG';
import { BrowserRouter as Router } from 'react-router-dom';
import FullPageLoader from '../components/FullPageLoader';
import { useAuthState } from '../features/Auth/context';
import { useLocaleState } from '../components/Layout/Header/Localization';

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

  useEffect(() => {
    if (token && !user)
      setTimeout(() => {
        setUser({ username: 'mohamed' });
      }, 2000);
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
