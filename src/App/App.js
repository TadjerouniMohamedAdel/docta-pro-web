import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import en from 'antd/es/locale/en_GB';
import ar from 'antd/es/locale/ar_EG';
import fr from 'antd/es/locale/fr_FR';
import { useAuthState } from '../features/Auth/context';
import FullPageSpinner from '../components/FullPageSpinner/FullPageSpinner';
import { useLocaleState } from '../components/Layout/components/Header/components/Localization';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() =>
  import('./UnauthenticatedApp/UnauthenticatedApp'),
);

function App() {
  const language = {
    ar,
    en,
    fr,
  };
  const { user, setUser } = useAuthState();
  const { locale } = useLocaleState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !user)
      setTimeout(() => {
        setUser({ username: 'mohamed' });
      }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ConfigProvider
      locale={language[locale]}
      direction={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      <Router>
        {token && !user ? (
          <FullPageSpinner />
        ) : (
          <React.Suspense fallback={<FullPageSpinner />}>
            {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          </React.Suspense>
        )}
      </Router>
    </ConfigProvider>
  );
}

export default App;
