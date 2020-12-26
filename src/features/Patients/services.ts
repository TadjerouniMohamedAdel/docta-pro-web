import fetcher from '../../utils/fetcher';

export const fetchAllPatients = async (term = '', page = 0, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients?term=${term}&skip=${page}&take=${size}`);
};
