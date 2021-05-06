import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchAllPatients } from '../services';

export const usePatientsList = (term: string) => {
  const [total, setTotal] = useState(0);

  const { data, ...rest } = useInfiniteQuery(
    ['patients', term],
    async ({ pageParam = 0 }) => {
      const res = await fetchAllPatients(term, pageParam);
      setTotal(res.total);
      return { ...res, patients: res.data };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor < lastPage.total ? lastPage.nextCursor : undefined,
    },
  );
  return { data: data && data.pages ? data : ({ pages: [] } as any), total, ...rest };
};
