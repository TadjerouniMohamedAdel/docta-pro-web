import fetcher from '../utils/fetcher';

export const fetchStates = async (countryCode: string): Promise<any> => {
  return fetcher(`/api/v1/countries/${countryCode}/states`);
};

export const fetchCities = async (stateId: string): Promise<any> => {
  return fetcher(`/api/v1/countries/states/${stateId}/cities`);
};
