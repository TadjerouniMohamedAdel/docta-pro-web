import { useInfiniteQuery } from 'react-query';
import { fetchBlockedPatients } from '../services';

export const useBlockedPatients = (term: string) => {
  const { data, ...rest } = useInfiniteQuery(
    ['blocked-patients', term],
    async ({ pageParam = 0 }) => {
      const res = await fetchBlockedPatients(term, pageParam);
      return { ...res, patients: res.data };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor < lastPage.total ? lastPage.nextCursor : undefined,
    },
  );
  return { data: data && data.pages ? data : ({ pages: [] } as any), ...rest };
};
