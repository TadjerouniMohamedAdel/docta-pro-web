import { useAuthState } from '../../Auth';
import { User } from '../../Auth/types';
import { useSetupAccountState } from '../context';

export const useNextStep = () => {
  const { user, setUser } = useAuthState();
  const { currentStep, setCurrentStep } = useSetupAccountState();

  const takeNextStep = async (steps = 1) => {
    if (user) {
      if (currentStep >= user.setupAccountProgress) {
        // await updateSetupAccountProgress(user?.setupAccountProgress + 1);
        setUser({ ...user, setupAccountProgress: user?.setupAccountProgress + steps } as User);
      } else {
        setCurrentStep(currentStep + steps);
      }
    }
  };

  return { takeNextStep };
};
