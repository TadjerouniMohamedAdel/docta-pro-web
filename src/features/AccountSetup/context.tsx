import React, { useEffect, useState } from 'react';

type ContextProps = {
  currentStep: number;
  setCurrentStep: (value: number) => void;
};

const SetupAccountStateContext = React.createContext<ContextProps | undefined>(undefined);

export const SetupAccountProvider: React.FunctionComponent<{
  children: React.ReactNode;
  setupAccountProgress?: number;
}> = ({ children, setupAccountProgress = 0 }) => {
  const [currentStep, setCurrentStep] = useState(setupAccountProgress);

  useEffect(() => {
    setCurrentStep(setupAccountProgress);
  }, [setupAccountProgress]);

  return (
    <SetupAccountStateContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </SetupAccountStateContext.Provider>
  );
};
export const useSetupAccountState = (): ContextProps => {
  const context = React.useContext(SetupAccountStateContext);
  if (context === undefined) {
    throw new Error('useSetupAccountState must be used within a SetupAccountProvider');
  }
  return context;
};
