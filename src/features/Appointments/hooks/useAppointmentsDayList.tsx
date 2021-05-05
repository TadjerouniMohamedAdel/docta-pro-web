import { useQuery } from 'react-query';
import { fetchAppointments } from '../services';
import { getDateKey } from '../utils';

export const useAppointmentsDayList = (date: Date, reasons: string[]) => {
  const { data, ...rest } = useQuery(
    ['appointments-day', getDateKey(date)],
    async () => {
      const res = await fetchAppointments(date, date, reasons);
      return res.data;
    },
    {
      keepPreviousData: true,
      refetchInterval: 3000,
    },
  );
  return {
    resolvedData: data
      ? data.map((item: any) => ({
          ...item,
          startDate: new Date(item.start),
          picture: item.patient.picture,
          firstName: item.patient.firstName,
          lastName: item.patient.lastName,
          visitReason: item.reason.name,
        }))
      : [],
    ...rest,
  };
};
