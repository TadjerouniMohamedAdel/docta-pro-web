import { useQuery } from 'react-query';
import { fetchPatientNotes } from '../services';

export const useGetPatientNotes = (patientId: string) => {
  const { data, isLoading, isError, isFetching } = useQuery(
    ['patient-notes', patientId],
    () => fetchPatientNotes(patientId),
    { keepPreviousData: true },
  );
  return { data: data ?? [], isLoading, isError, isFetching };
};
