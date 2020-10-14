import React, { useEffect } from 'react';
import { useAuthState } from '../features/Auth/context';
import FullPageSpinner from '../components/FullPageSpinner/FullPageSpinner';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() =>
  import('./UnauthenticatedApp/UnauthenticatedApp'),
);

function App() {
  const { user, setUser } = useAuthState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token && !user)
      setTimeout(() => {
        setUser({ username: 'mohamed' });
      }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {token && !user ? (
        <FullPageSpinner />
      ) : (
        <React.Suspense fallback={<FullPageSpinner />}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      )}
    </>
  );
}

export default App;
