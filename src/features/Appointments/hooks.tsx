import moment from 'moment';
import { useQuery, useQueryClient } from 'react-query';
import { getWeekRange } from '../../utils/date';
import { fetchAppointments } from './services';
import { AppointmentForm } from './types';

export const useAppointmentsDayList = (date: Date, reasons: string[]) => {
  const { data, ...rest } = useQuery(
    ['appointments-day', date],
    async () => {
      const res = await fetchAppointments(date, date, reasons);
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

export const useAppointmentsWeekList = (date: Date, reasons: string[]) => {
  const { start, end } = getWeekRange(date);
  const { data, ...rest } = useQuery(
    ['appointments-week', start, end],
    async () => {
      const res = await fetchAppointments(start, end, reasons);
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
    let cacheKey: any;

    if (view === 'week') {
      const { start, end } = getWeekRange(date);
      cacheKey = ['appointments-week', start, end];
    } else cacheKey = ['appointments-day', date];

    let data = (await queryClient.getQueryData(cacheKey)) as any;
    if (data) {
      const index = data.findIndex((item: any) => item.id === appointmentId);
      if (index > -1) {
        data[index] = {
          ...data[index],
          start: appointment.start,
          end: moment(appointment.start).add(appointment.duration, 'minutes'),
          time: appointment.start,
          reasonId: appointment.reasonId,
          duration: appointment.duration,
        };
        if (view === 'day')
          data = data.sort((a: any, b: any) => (moment(b.start).isBefore(a.start) ? 1 : -1));
        queryClient.setQueryData(cacheKey, data);
      }
    }
  };
  return { updateAppointmentCache };
};
