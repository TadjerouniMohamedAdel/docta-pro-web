/* eslint-disable radix */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { Form } from 'antd';
import moment from 'moment';
import { Button, Modal, Icon } from '../../../../components';
import { AppointmentForm } from '../../types';
import { updateAppointmentStatus } from '../../services';
import { ProtectedComponent } from '../../../Auth';
import { useUpdateAppointment } from '../../hooks';
import { getWeekRange } from '../../../../common/utilities';
import AppointmentInfo from '../../components/AppointmentInfo/AppointmentInfo';

type Props = {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  patientId: string;
  currentDate: Date;
};

const AppointmentDetails: React.FC<Props> = ({
  visible,
  onClose,
  appointmentId,
  currentDate,
  patientId,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [appointmentForm] = Form.useForm();

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useUpdateAppointment();
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
    <Modal
      title={t('appointment details')}
      visible={visible}
      width={780}
      onCancel={onClose}
      borderedHeader={false}
      actions={
        <ProtectedComponent accessCode="edit/appointments">
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            onClick={appointmentForm.submit}
            loading={isLoadingEdit}
            style={{ textTransform: 'uppercase' }}
          >
            {t('save')}
          </Button>
        </ProtectedComponent>
      }
    >
      <AppointmentInfo
        onClose={onClose}
        appointmentId={appointmentId}
        currentDate={currentDate}
        onEditSave={handleEditAppointment}
        appointmentForm={appointmentForm}
        patientId={patientId}
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
    </Modal>
  );
};

export default AppointmentDetails;
