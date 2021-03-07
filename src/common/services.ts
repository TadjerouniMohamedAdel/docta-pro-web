import fetcher from '../utils/fetcher';

export const fetchStates = async (countryId: string): Promise<any> => {
  return fetcher(`/api/v1/countries/${countryId}/states`);
};

export const fetchCities = async (stateId: string): Promise<any> => {
  return fetcher(`/api/v1/countries/states/${stateId}/cities`);
};
