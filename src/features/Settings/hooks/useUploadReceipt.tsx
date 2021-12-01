import { useMutation, useQueryClient } from 'react-query';
import { uploadReceipt } from '../services';

export const useUploadReceipt = () => {
    const queryClient = useQueryClient();

    return useMutation(uploadReceipt, {
        onSuccess: () => {
            queryClient.invalidateQueries('subscription-plans');
            queryClient.invalidateQueries('current-subscription');
            queryClient.invalidateQueries('next-subscription');
            queryClient.invalidateQueries(['invoices']);
        }
    });
};
