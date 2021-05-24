import { fetcher } from '../utilities';

export const fetchStates = async (countryCode: string): Promise<any> => {
  return fetcher(`/api/v1/countries/${countryCode}/states?skip=0&take=100`);
};
