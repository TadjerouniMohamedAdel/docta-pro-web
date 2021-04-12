import { useQuery } from 'react-query';
import { getWeekRange } from '../../../utils/date';
import { fetchAppointments } from '../services';
import { getDateKey } from '../utils';

export const useAppointmentsWeekList = (date: Date, reasons: string[]) => {
  const { start, end } = getWeekRange(date);
  const { data, ...rest } = useQuery(
    ['appointments-week', getDateKey(start), getDateKey(end)],
    async () => {
      const res = await fetchAppointments(start, end, reasons);
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
          start: new Date(item.start),
          end: new Date(item.end),
          picture: item.patient.picture,
          firstName: item.patient.firstName,
          lastName: item.patient.lastName,
          visitReason: item.reason.name,
          title: `${item.patient.firstName} ${item.patient.lastName}`,
        }))
      : [],
    ...rest,
  };
};
