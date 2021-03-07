import fetcher from '../../utils/fetcher';
import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  return fetcher('/api/v1/users/auth?action=pro', {
    body: params,
  });
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  return fetcher('/api/v1/professionals/current-user');
};

// TODO this api should use GET method !!!
export const CheckPhoneNumber = async (phone: string): Promise<AuthResponse> => {
  return fetcher('/api/v1/users/phone-verification?action=pro', {
    body: { phone },
  });
};

type ResetPasswordParams = {
  password: string;
  tokenId: string;
};

export const resetPassword = async (params: ResetPasswordParams): Promise<void> => {
  return fetcher('/api/v1/users/reset-password?action=pro', {
    body: params,
  });
};
