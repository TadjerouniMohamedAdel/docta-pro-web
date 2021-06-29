import { useMutation, useQueryClient } from 'react-query';
import { addPatientNote } from '../services';

export const useAddPatientNotes = () => {
  const queryClient = useQueryClient();

  return useMutation(addPatientNote, {
    onSuccess: () => queryClient.invalidateQueries('patient-notes'),
  });
};
