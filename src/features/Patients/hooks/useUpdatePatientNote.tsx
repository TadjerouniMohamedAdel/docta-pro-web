import { useMutation, useQueryClient } from 'react-query';
import { updatePatientNote } from '../services';

export const useUpdatePatientNotes = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePatientNote, {
    onSuccess: () => queryClient.invalidateQueries('patient-notes'),
  });
};
