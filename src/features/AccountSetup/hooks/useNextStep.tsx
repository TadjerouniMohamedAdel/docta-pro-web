import { useAuthState } from '../../Auth';
import { User } from '../../Auth/types';
import { useSetupAccountState } from '../context';

export const useNextStep = () => {
  const { user, setUser } = useAuthState();
  const { currentStep, setCurrentStep } = useSetupAccountState();

  const takeNextStep = async () => {
    if (user) {
      if (currentStep >= user.setupAccountProgress) {
        // await updateSetupAccountProgress(user?.setupAccountProgress + 1);
        setUser({ ...user, setupAccountProgress: user?.setupAccountProgress + 1 } as User);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  return { takeNextStep };
};
