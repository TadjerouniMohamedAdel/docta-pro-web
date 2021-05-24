import { fetcher } from '../utilities';

export const fetchCities = async (stateId: string): Promise<any> => {
  return fetcher(`/api/v1/countries/states/${stateId}/cities?skip=0&take=100`);
};
