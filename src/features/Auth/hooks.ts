import { useAuthState } from './context';

export const useCheckAccess = (type: string, accessCode: string) => {
  const { user } = useAuthState();

  const CheckAccess = () => {
    if (user) {
      switch (type) {
        case 'section':
          if (user.permissions.find((item) => item.section.code === accessCode)) return true;
          return false;

        case 'permission':
          if (user.permissions.find((item) => item.code === accessCode)) return true;
          return false;

        default:
          return false;
      }
    }
    return false;
  };
  return { CheckAccess };
};
