import { useQuery } from 'react-query';
import { fetchPatientVisitHistory } from './services';

export const useGetVisitHistory = (patientId: string, page: number, size: number) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ['visit-history', patientId, page, size],
    () => fetchPatientVisitHistory(patientId, page, size),
    { keepPreviousData: true },
  );
  return { resolvedData: data ?? [], isLoading, isError, isFetching };
};
