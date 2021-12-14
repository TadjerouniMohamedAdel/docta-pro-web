import { useQuery } from 'react-query';
import { fetchPrescriptionDetails } from '../services';

export const useGetPrescription = (prescriptionId: string | null) => {
  const { data, ...rest } = useQuery(['prescription', prescriptionId], () =>
    prescriptionId ? fetchPrescriptionDetails(prescriptionId) : null,
  );
  return { prescription: data ?? null, ...rest };
};
