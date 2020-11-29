import fetcher from '../../utils/fetcher';
import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  return fetcher('/api/v1/users/auth?action=pro', {
    body: params,
  });
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  return {
    data: {
      firstName: 'mohamed',
      lastName: 'chiller',
      phone: '+213791686064',
      email: 'mohamed@cleverzone.io',
    },
  };

  // return fetcher('/api/v1/users/?action=pro');
};
