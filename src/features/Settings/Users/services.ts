import fetcher from '../../../utils/fetcher';
import { AddUserParams, EditUserParams } from './types';

export const fetchUsers = async (key: string, page = 1, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals?skip=${(page - 1) * size}&take=${size}`);
};

export const fetchUser = async (id: string): Promise<any> => {
  return fetcher(`/api/v1/professionals/${id}`);
};

export const fetchRoles = async (): Promise<any> => {
  return fetcher('/api/v1/professionals/roles-permissions');
};

export const fetchPermissions = async (): Promise<any> => {
  return fetcher('/api/v1/professionals/sections-permissions');
};

export const addUser = async (params: AddUserParams): Promise<any> => {
  return fetcher('/api/v1/professionals', {
    body: params,
  });
};

export const editUser = async ({
  id,
  body,
}: {
  id: string;
  body: EditUserParams;
}): Promise<any> => {
  return fetcher(`/api/v1/professionals/${id}`, {
    body,
    method: 'PUT',
  });
};
