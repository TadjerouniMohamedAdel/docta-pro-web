import { useMutation, useQueryClient } from 'react-query';
import { removePatientNote } from '../services';

export const useRemovePatientNotes = () => {
  const queryClient = useQueryClient();

  return useMutation(removePatientNote, {
    onSuccess: () => queryClient.invalidateQueries('patient-notes'),
  });
};
