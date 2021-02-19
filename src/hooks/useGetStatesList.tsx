import { useQuery } from 'react-query';
import { fetchStates } from '../common/services';

export const useGetStatesList = (countryId = 'e29a216e-0846-49a9-86e1-343791678031') => {
  const { data, ...rest } = useQuery('states', () => fetchStates(countryId), {
    keepPreviousData: true,
  });
  return { states: data ?? [], ...rest };
};
