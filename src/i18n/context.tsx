import React, { useState } from 'react';

type ContextProps = {
  locale: string | undefined;
  setLocale: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const LocaleStateContext = React.createContext<ContextProps | undefined>(undefined);

export const LocaleProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string | undefined>(localStorage.getItem('locale') ?? 'en');

  return (
    <LocaleStateContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleStateContext.Provider>
  );
};
export const useLocaleState = (): ContextProps => {
  const context = React.useContext(LocaleStateContext);
  if (context === undefined) {
    throw new Error('useLocaleState must be used within a LocaleProvider');
  }
  return context;
};
