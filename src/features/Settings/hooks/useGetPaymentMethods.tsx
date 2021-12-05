import { useQuery } from 'react-query';
import { fetchPaymentMethods } from '../services';

export const useGetPaymentMethods = () => {
  const { data, ...rest } = useQuery('payment-methods', () => fetchPaymentMethods(), {
    keepPreviousData: true,
  });
  return { methods: data ?? [], ...rest };
};
