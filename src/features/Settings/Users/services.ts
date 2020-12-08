import fetcher from '../../../utils/fetcher';

export const fetchUsers = async (key: string, page = 1, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals?skip=${(page - 1) * size}&take=${size}`);
};
