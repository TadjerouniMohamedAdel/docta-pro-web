import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams):Promise<AuthResponse> => {
  console.log('login params', params);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'my token', user: { username: 'mohamed' } });
    }, 2000);
  });
};
