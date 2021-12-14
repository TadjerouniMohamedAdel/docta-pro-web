import { useQuery } from 'react-query';
import { fetchPatientDetails } from '../../Patients/services';

export const useGetPatientInfo = (patientId: string) => {
  const { data, ...rest } = useQuery(['patient-info'], () =>
    fetchPatientDetails(patientId, 'personal-info'),
  );
  return { patientInfo: data ?? null, ...rest };
};
