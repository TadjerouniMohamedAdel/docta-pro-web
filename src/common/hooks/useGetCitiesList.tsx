import { useQuery } from 'react-query';
import { fetchCities } from '../services';

export const useGetCitiesList = (stateId = '') => {
  const { data, ...rest } = useQuery(['cities', stateId], () => fetchCities(stateId), {
    keepPreviousData: true,
    enabled: !!stateId,
  });
  return { cities: data ?? [], ...rest };
};
