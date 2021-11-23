import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchPrescriptionsHistory } from '../services';

export const useGetPrescriptionsHistory = (patientId: string) => {
  const [total, setTotal] = useState(0);

  const { data, ...rest } = useInfiniteQuery(
    ['prescriptions-history', patientId],
    async ({ pageParam = 0 }) => {
      const res = await fetchPrescriptionsHistory(patientId, pageParam);
      setTotal(res.total);
      return { ...res, prescriptions: res.data };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor < lastPage.total ? lastPage.nextCursor : undefined,
    },
  );
  return { data: data && data.pages ? data : ({ pages: [] } as any), total, ...rest };
};
