import React, { useState } from 'react';

const AuthenticatedApp = React.lazy(() =>
  import(/* webpackPrefetch: true */ './AuthenticatedApp/AuthenticatedApp'),
);
const UnauthenticatedApp = React.lazy(() =>
  import('./UnauthenticatedApp/UnauthenticatedApp'),
);

function App() {
  const [user] = useState();

  return (
    <React.Suspense fallback="loading...">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
