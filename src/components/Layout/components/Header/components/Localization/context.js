import React, { useState } from 'react';

const LocaleStateContext = React.createContext();

// eslint-disable-next-line react/prop-types
function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(localStorage.getItem('locale') ?? 'en');

  return (
    <LocaleStateContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleStateContext.Provider>
  );
}
function useLocaleState() {
  const context = React.useContext(LocaleStateContext);
  if (context === undefined) {
    throw new Error('useLocaleState must be used within a LocaleProvider');
  }
  return context;
}

export { LocaleProvider, useLocaleState };
