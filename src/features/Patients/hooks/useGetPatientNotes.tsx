import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchPatientNotes } from '../services';

export const useGetPatientNotes = (patientId: string, term: string) => {
  const [total, setTotal] = React.useState(0);

  const { data, ...rest } = useInfiniteQuery(
    ['patient-notes', term],
    async ({ pageParam = 0 }) => {
      const res = await fetchPatientNotes(patientId, term, pageParam);
      setTotal(res.total);
      return { ...res, patientsNotes: res.data };
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor < lastPage.total ? lastPage.nextCursor : undefined,
    },
  );
  return { data: data && data.pages ? data : ({ pages: [] } as any), total, ...rest };
};
