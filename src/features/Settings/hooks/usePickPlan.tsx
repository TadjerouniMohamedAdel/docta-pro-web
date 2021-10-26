import { useMutation, useQueryClient } from 'react-query';
import { pickPlan } from '../services';

export const usePickPlan = () => {
    const queryClient = useQueryClient();

    return useMutation(pickPlan, {
        onSuccess: () => {
            queryClient.invalidateQueries('subscription-plans');
            queryClient.invalidateQueries('current-subscription');
            queryClient.invalidateQueries('next-subscription');
        }
    });
};
