import fetcher from '../../../utils/fetcher';

type ResetPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

export const resetProPassword = async (params: ResetPasswordParams): Promise<void> => {
  return fetcher('/api/v1/professionals/settings/reset-password', {
    body: params,
  });
};
