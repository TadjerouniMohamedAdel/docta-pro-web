import { useQuery } from 'react-query';
import { fetchInvoices } from '../services';

export const useGetInvoices = (page: number, size: number) => {
    const { data, ...rest } = useQuery(['invoices', page], () => fetchInvoices(page, size));
    return { invoices: data ?? null, ...rest };
};