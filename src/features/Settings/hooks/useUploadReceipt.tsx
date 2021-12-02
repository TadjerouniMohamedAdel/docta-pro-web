import { useMutation, useQueryClient } from 'react-query';
import { uploadReceipt } from '../services';

export const useUploadReceipt = () => {
    const queryClient = useQueryClient();

    return useMutation(uploadReceipt, {
        onSuccess: () => {
            queryClient.invalidateQueries(['invoices']);
            queryClient.invalidateQueries('next-subscription');
        }
    });
};
