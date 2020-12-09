import fetcher from '../../../utils/fetcher';

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
