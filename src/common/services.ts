import fetcher from '../utils/fetcher';

export const fetchStates = async (countryCode: string): Promise<any> => {
  return fetcher(`/api/v1/countries/${countryCode}/states?skip=0&take=100`);
};

export const fetchCities = async (stateId: string): Promise<any> => {
  return fetcher(`/api/v1/countries/states/${stateId}/cities?skip=0&take=100`);
};
