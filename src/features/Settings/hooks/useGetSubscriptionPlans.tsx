import { useQuery } from 'react-query';
import { fetchSubscriptionPlans } from '../services';

export const useGetSubscriptionPlans = () => {
  const { data, ...rest } = useQuery(['subscription-plans'], () => fetchSubscriptionPlans());
  return { plans: data ?? [], ...rest };
};