import React, { useEffect } from 'react';
import { useAuthState } from '../features/Auth/context';

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
        'loading'
      ) : (
        <React.Suspense fallback="loading">
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      )}
    </>
  );
}

export default App;
