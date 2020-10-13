import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './features/Auth/context';
import './i18n';
import './styles/index.less';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
