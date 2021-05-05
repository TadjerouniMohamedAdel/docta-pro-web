import { useQuery } from 'react-query';
import moment from 'moment';
import { fetchAppointmentsCount } from '../services';
import { getDateKey } from '../utils';

export const useAppointmentCount = (date: Date, type: 'month' | 'day') => {
  let from: Date = date;
  let to: Date = date;
  if (type === 'month') {
    from = moment(date).clone().startOf('month').toDate();
    to = moment(date).clone().endOf('month').toDate();
  }
  return useQuery(
    ['appointments-count', getDateKey(from), getDateKey(to)],
    async () => {
      const res = await fetchAppointmentsCount(from, to);
      return res.data;
    },
    {
      keepPreviousData: true,
    },
  );
};
