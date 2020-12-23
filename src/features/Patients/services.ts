import fetcher from '../../utils/fetcher';

export const fetchAllPatients = async (page = 0, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients?skip=${page}&take=${size}`);
};
