import fetcher from '../../../utils/fetcher';

type ResetPasswordParams = {
  password: string;
  newPassword: string;
};

export const resetProPassword = async (params: ResetPasswordParams): Promise<void> => {
  return fetcher('/api/v1/professionals/settings/password ', {
    body: params,
    method: 'PUT',
  });
};

export const checkPassword = async (params: { password: string }): Promise<void> => {
  return fetcher('/api/v1/professionals/settings/password', {
    body: params,
  });
};

export const updatePhone = async (params: { tokenId: string }): Promise<void> => {
  return fetcher('/api/v1/professionals/settings/phone ', {
    body: params,
    method: 'PUT',
  });
};
