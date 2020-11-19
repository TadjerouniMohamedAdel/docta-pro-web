import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.less';
import 'remixicon/fonts/remixicon.css';
import App from './App';
import './i18n';
import AppProvider from './AppProvider';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
