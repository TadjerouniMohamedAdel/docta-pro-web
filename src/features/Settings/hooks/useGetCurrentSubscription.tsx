import { useQuery } from 'react-query';
import { fetchCurrentSubscription } from '../services';

export const useGetCurrentSubscription = () => {
  const { data, ...rest } = useQuery('current-subscription', () => fetchCurrentSubscription());
  return { currentSubscription: data ?? null, ...rest };
};