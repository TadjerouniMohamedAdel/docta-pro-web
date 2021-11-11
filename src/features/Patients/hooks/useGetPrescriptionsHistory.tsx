import { useQuery } from 'react-query';
import { fetchPrescriptionsHistory } from '../services';

export const useGetPrescriptionsHistory = (patientId: string, page: number, size: number) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ['prescriptions-history', patientId, page, size],
    () => fetchPrescriptionsHistory(patientId, page, size),
    { keepPreviousData: true },
  );
  return { resolvedData: data ?? [], isLoading, isError, isFetching };
};
