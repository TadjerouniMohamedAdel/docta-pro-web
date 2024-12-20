import { fetcher } from '../../common/utilities';
import { AuthResponse, LoginParams } from './types';

export const login = async (params: LoginParams): Promise<AuthResponse> => {
  return fetcher('/api/v1/users/auth?action=pro', {
    body: params,
    showError: false,
  });
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  return fetcher('/api/v1/professionals/current-user');
};

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
