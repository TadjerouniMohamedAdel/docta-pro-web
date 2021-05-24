import { useAuthState } from '../context';
import { AccessCode } from '../types';

export const useCheckAccess = () => {
  const { user } = useAuthState();

  const CheckAccess = (type: 'section' | 'permission', accessCode: AccessCode) => {
    if (user) {
      if (user.role.code === 'practitioner') return true;
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
