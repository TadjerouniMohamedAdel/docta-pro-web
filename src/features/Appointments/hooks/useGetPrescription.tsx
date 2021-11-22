import { useQuery } from 'react-query';
import { fetchPrescriptionDetails } from '../services';

export const useGetPrescription = (prescriptionId: string) => {

    const { data, ...rest } = useQuery(['prescription', prescriptionId], () => fetchPrescriptionDetails(prescriptionId));
      return { prescription: data ?? null, ...rest };
    
};
