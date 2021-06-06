import { useAuthState } from '../../Auth';
import { User } from '../../Auth/types';
import { useSetupAccountState } from '../context';
import { updateSetupAccountProgress } from '../services';

export const useNextStep = () => {
  const { user, setUser } = useAuthState();
  const { currentStep, setCurrentStep } = useSetupAccountState();

  const takeNextStep = async (steps = 1) => {
    if (user) {
      if (currentStep >= user.setupAccountProgress) {
        await updateSetupAccountProgress(user?.setupAccountProgress + 1);
        setUser({ ...user, setupAccountProgress: user?.setupAccountProgress + steps } as User);
      } else {
        setCurrentStep(currentStep + steps);
      }
    }
  };

  const finishSteps = async () => {
    if (user) {
      await updateSetupAccountProgress(-1);
      setUser({ ...user, setupAccountProgress: -1 } as User);
    }
  };

  return { takeNextStep, finishSteps };
};
