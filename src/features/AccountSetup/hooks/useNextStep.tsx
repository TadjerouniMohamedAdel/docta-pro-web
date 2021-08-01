import { useAuthState } from '../../Auth';
import { User } from '../../Auth/types';
import { useSetupAccountState } from '../context';
import { updateSetupAccountProgress } from '../services';

export const useNextStep = () => {
  const { user, setUser } = useAuthState();
  const { currentStep, setCurrentStep } = useSetupAccountState();

  const takeNextStep = async (steps = 1) => {
    try {
      if (user) {
        if (currentStep >= user.setupAccountProgress) {
          await updateSetupAccountProgress(user?.setupAccountProgress + steps);
          setUser({ ...user, setupAccountProgress: user?.setupAccountProgress + steps } as User);
        } else {
          setCurrentStep(currentStep + steps);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const finishSteps = async () => {
    try {
      if (user) {
        await updateSetupAccountProgress(-1);
        setUser({ ...user, setupAccountProgress: -1 } as User);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { takeNextStep, finishSteps };
};
