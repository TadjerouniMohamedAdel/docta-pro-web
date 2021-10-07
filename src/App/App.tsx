import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import ar from 'antd/es/locale/ar_EG';
import en from 'antd/es/locale/en_GB';
import fr from 'antd/es/locale/fr_FR';
import moment from 'moment';
import 'moment/locale/ar-tn';
import 'moment/locale/fr';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryCache } from 'react-query';
import { useTranslation } from 'react-i18next';
import AppLoader from '../components/AppLoader';
import { useAuthState } from '../features/Auth/context';
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
    fr,
  };

  const { user, setUser } = useAuthState();
  const { i18n } = useTranslation();
  const token = localStorage.getItem('token');

  moment.updateLocale(i18n.language === 'ar' ? 'ar-tn' : i18n.language || 'fr', {
    week: {
      dow: 0,
      doy: 0,
    },
  });

  const handleFetchCurrentUser = async (): Promise<void> => {
    try {
      const response: AuthResponse | undefined = await getCurrentUser();
      if (response) {
        setUser(response.data);
      }
    } catch (err) {
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
      locale={(language as any)[i18n.language ?? 'fr']}
      direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    >
      <Router>
        {token && !user ? <AppLoader /> : user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </Router>
    </ConfigProvider>
  );
}

export default App;
