import { useQuery } from 'react-query';
import { fetchNextSubscription } from '../services';

export const useGetNextSubscription = () => {
  const { data, ...rest } = useQuery('next-subscription', () => fetchNextSubscription());
  return { nextSubscription: data ?? null, ...rest };
};