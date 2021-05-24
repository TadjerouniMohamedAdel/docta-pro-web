import { useQuery } from 'react-query';
import { fetchStates } from '../services';

export const useGetStatesList = (countryCode = 'DZA') => {
  const { data, ...rest } = useQuery('states', () => fetchStates(countryCode), {
    keepPreviousData: true,
  });
  return { states: data ?? [], ...rest };
};
