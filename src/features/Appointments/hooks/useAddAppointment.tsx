import moment from 'moment';
import { useMutation, useQueryClient } from 'react-query';
import { getWeekRange } from '../../../utils/date';
import { addAppointment } from '../services';
import { AppointmentForm, Patient } from '../types';
import { getDateKey } from '../utils';

export const useAddAppointment = () => {
  const queryClient = useQueryClient();

  const updateAppointmentsList = async (
    appointment: AppointmentForm,
    date: Date,
    view: 'day' | 'week',
    patient: Patient,
  ) => {
    let cacheKey: any;

    if (view === 'week') {
      const { start, end } = getWeekRange(date);
      cacheKey = ['appointments-week', getDateKey(start), getDateKey(end)];
    } else cacheKey = ['appointments-day', getDateKey(date)];

    let data = (await queryClient.getQueryData(cacheKey)) as any;
    const previousData = data ? [...data] : [];
    if (data) {
      data.push({
        ...appointment,
        start: appointment.start,
        end: moment(appointment.start).add(appointment.duration, 'minutes'),
        time: appointment.start,
        reasonId: appointment.reasonId,
        duration: appointment.duration,
        patient,
        reason: {
          name: '...',
        },
      });
      if (view === 'day')
        data = data.sort((a: any, b: any) => (moment(b.start).isBefore(a.start) ? 1 : -1));
      queryClient.setQueryData(cacheKey, data);
    }

    return { previousData, key: cacheKey };
  };

  return useMutation(
    ({ appointmentForm }: { appointmentForm: AppointmentForm; date: Date; patient: Patient }) =>
      addAppointment(appointmentForm),
    {
      onMutate: async ({ appointmentForm, date, patient }) => {
        const { previousData: previousAppointmentDay, key: dayKey } = await updateAppointmentsList(
          appointmentForm,
          date,
          'day',
          patient,
        );

        const {
          previousData: previousAppointmentWeek,
          key: weekKey,
        } = await updateAppointmentsList(appointmentForm, date, 'week', patient);

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
