import fetcher from '../../utils/fetcher';
import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  const response: AuthResponse = await fetcher('/api/v1/auth', {
    body: params,
  });

  console.log('auth response', response);
  return response;

  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve({ token: 'my token', user: { username: 'mohamed' } });
  //   }, 2000);
  // });
};
