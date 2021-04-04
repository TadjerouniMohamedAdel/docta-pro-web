import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { getWeekRange } from '../../../utils/date';
import { editAppointment } from '../services';
import { AppointmentForm } from '../types';
import { getDateKey } from '../utils';

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  const updateAppointmentsList = async (
    appointmentId: string,
    appointment: AppointmentForm,
    date: Date,
    view: 'day' | 'week',
  ) => {
    let cacheKey: any;

    if (view === 'week') {
      const { start, end } = getWeekRange(date);
      cacheKey = ['appointments-week', getDateKey(start), getDateKey(end)];
    } else cacheKey = ['appointments-day', getDateKey(date)];

    let data = (await queryClient.getQueryData(cacheKey)) as any;
    const previousData = data ? [...data] : [];
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

    return { previousData, key: cacheKey };
  };

  return useMutation(
    ({
      appointmentId,
      appointmentForm,
    }: {
      appointmentId: string;
      appointmentForm: AppointmentForm;
      date: Date;
    }) => editAppointment({ appointmentId, appointmentForm }),
    {
      onMutate: async ({ appointmentId, appointmentForm, date }) => {
        const { previousData: previousAppointmentDay, key: dayKey } = await updateAppointmentsList(
          appointmentId,
          appointmentForm,
          date,
          'day',
        );

        const {
          previousData: previousAppointmentWeek,
          key: weekKey,
        } = await updateAppointmentsList(appointmentId, appointmentForm, date, 'week');

        return { previousAppointmentDay, dayKey, previousAppointmentWeek, weekKey };
      },
      onError: (err, data, context: any) => {
        queryClient.setQueryData(context.dayKey, context.previousAppointmentDay);
        queryClient.setQueryData(context.weekKey, context.previousAppointmentWeek);
      },
      onSettled: (data, error, variables, context) => {
        queryClient.invalidateQueries(context.dayKey);
        queryClient.invalidateQueries(context.weekKey);
      },
    },
  );
};
