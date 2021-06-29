import { useQuery } from 'react-query';
import { fetchPatientNotes } from '../services';

export const useGetPatientNotes = (patientId: string) => {
  const { data: response, isLoading, isError, isFetching } = useQuery(
    ['patient-notes', patientId],
    () => fetchPatientNotes(patientId),
    { keepPreviousData: true },
  );
  return { data: response?.data, isLoading, isError, isFetching };
};
