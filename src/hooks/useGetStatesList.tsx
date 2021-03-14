import { useQuery } from 'react-query';
import { fetchStates } from '../common/services';

export const useGetStatesList = (countryCode = 'DZA') => {
  const { data, ...rest } = useQuery('states', () => fetchStates(countryCode), {
    keepPreviousData: true,
  });
  return { states: data ?? [], ...rest };
};
