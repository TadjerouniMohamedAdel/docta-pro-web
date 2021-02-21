import { useQuery } from 'react-query';
import { getWeekRange } from '../../utils/date';
import { fetchAppointments } from './services';

export const useAppointmentsDayList = (date: Date) => {
  const { data, ...rest } = useQuery(
    ['appointments-day', date],
    () => fetchAppointments(date, date),
    {
      keepPreviousData: true,
    },
  );
  return {
    resolvedData: data
      ? data.data.map((item: any) => ({
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

export const useAppointmentsWeekList = (date: Date) => {
  const { start, end } = getWeekRange(date);
  const { data, ...rest } = useQuery(
    ['appointments-week', start, end],
    async () => {
      const res = await fetchAppointments(start, end);
      return res.data;
    },
    {
      keepPreviousData: true,
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

// TODO update cache when adding new appointment
// export const useUpdateAppointmentsWeekList = (date: Date) => {
//   const { start, end } = getWeekRange(date);

//   const queryClient = useQueryClient();
//   const addNewAppointment = (appointmentId: string) => {
//     // get appointment details and add it to cached data
//     const data = queryClient.getQueryData(['appointments-week', start, end]);

//   };
//   return { addNewAppointment };
// };
