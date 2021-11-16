/* eslint-disable radix */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UseMutateAsyncFunction, useMutation, useQueryClient } from 'react-query';
import { FormInstance } from 'antd';
import moment from 'moment';
import { Button, Icon } from '../../../../../components';
import { AppointmentForm, AppointmentModalContentTypes } from '../../../types';
import { updateAppointmentStatus } from '../../../services';
import { ProtectedComponent } from '../../../../Auth';
import { getWeekRange } from '../../../../../common/utilities';
import AppointmentInfo from '../AppointmentInfo/AppointmentInfo';

type Props = {
  onClose: () => void;
  appointmentId: string;
  patientId: string;
  currentDate: Date;
  mutateAsyncEdit: UseMutateAsyncFunction<
    string,
    unknown,
    {
      appointmentId: string;
      appointmentForm: AppointmentForm;
      date: Date;
    },
    any
  >;
  appointmentForm: FormInstance<any>;
  setContentType: (contentType: AppointmentModalContentTypes) => void;
};

const AppointmentDetailsContent: React.FC<Props> = ({
  onClose,
  appointmentId,
  currentDate,
  patientId,
  mutateAsyncEdit,
  appointmentForm,
  setContentType,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const { mutateAsync: mutateAsyncDelete, isLoading: isLoadingDelete } = useMutation(
    updateAppointmentStatus,
  );
  const queryClient = useQueryClient();

  const handleEditAppointment = async (values: AppointmentForm) => {
    const time = moment(values.time).format('HH:mm').toString();
    const data = {
      ...values,
      start: moment(values.start)
        .set({
          h: parseInt(time.split(':')[0]),
          m: parseInt(time.split(':')[1]),
          s: 0,
          ms: 0,
        })
        .toDate(),
    };
    await mutateAsyncEdit({
      appointmentId,
      appointmentForm: data,
      date: currentDate,
    });

    onClose();
  };

  const handleDeleteAppointment = async () => {
    await mutateAsyncDelete({ appointmentId, status: 'DOCTOR_CANCELED' });
    // TODO: remove ivalidateQueries adn replace it with a hook that updates query cache data (setQueryData)
    queryClient.invalidateQueries(['appointments-day', currentDate]);
    const { start, end } = getWeekRange(currentDate);
    queryClient.invalidateQueries(['appointments-week', start, end]);

    onClose();
  };

  return (
    <>
      <AppointmentInfo
        onClose={onClose}
        appointmentId={appointmentId}
        currentDate={currentDate}
        onEditSave={handleEditAppointment}
        appointmentForm={appointmentForm}
        patientId={patientId}
        setContentType={setContentType}
      />
      <ProtectedComponent accessCode="delete/appointments">
        <div style={{ padding: '16px 40px' }}>
          <Button
            type="primary"
            danger
            block
            icon={<Icon name="delete-bin-2-line" />}
            onClick={handleDeleteAppointment}
            loading={isLoadingDelete}
            style={{ textTransform: 'uppercase' }}
          >
            {t('delete appointment')}
          </Button>
        </div>
      </ProtectedComponent>
    </>
  );
};

export default AppointmentDetailsContent;
