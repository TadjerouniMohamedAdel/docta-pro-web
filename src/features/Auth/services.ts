import fetcher from '../../utils/fetcher';
import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  return fetcher('/api/v1/users/auth?action=pro', {
    body: params,
  });
};
