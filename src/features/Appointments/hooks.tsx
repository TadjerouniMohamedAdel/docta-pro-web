import { useQuery, useQueryClient } from 'react-query';
import { getWeekRange } from '../../utils/date';
import { fetchAppointments } from './services';
import { AppointmentForm } from './types';

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

// finish update appointment cache on add update and delete for both day and week view
export const useUpdateAppointmentsCache = () => {
  const queryClient = useQueryClient();

  const updateAppointmentCache = async (
    appointmentId: string,
    view: 'day' | 'week',
    appointment: AppointmentForm,
    date: Date,
  ) => {
    if (view === 'week') {
      const { start, end } = getWeekRange(date);
      const data = (await queryClient.getQueryData(['appointments-week', start, end])) as any;

      if (data) {
        const index = data.findIndex((item: any) => item.id === appointmentId);
        if (index > -1) {
          data[index] = {
            ...data[index],
            start: appointment.start,
            time: appointment.start,
            reasonId: appointment.reasonId,
            duration: appointment.duration,
          };
          queryClient.setQueryData(['appointments-week', start, end], data);
        }
      }
    }
  };
  return { updateAppointmentCache };
};
