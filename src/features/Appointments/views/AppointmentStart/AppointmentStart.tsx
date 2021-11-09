/* eslint-disable radix */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { editAppointment } from '../../services';
import StartAppointmentContent from '../../components/AppointmentModalContent/StartAppointmentContent/StartAppointmentContent';

type Props = {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  patientId: string;
  currentDate: Date;
  scheduleNewAppointment: () => void;
};

const AppointmentStart: React.FC<Props> = ({
  visible,
  onClose,
  appointmentId,
  currentDate,
  scheduleNewAppointment,
  patientId,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [appointmentForm] = Form.useForm();

  const [contentType] = useState<'info' | 'new-prescription'>('new-prescription');
  const [modalTitle] = useState({
    title: t('start appointment'),
    onClick: appointmentForm.submit,
  });

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);

  let content = null;

  switch (contentType) {
    case 'info':
      content = (
        <StartAppointmentContent
          onClose={onClose}
          appointmentId={appointmentId}
          patientId={patientId}
          currentDate={currentDate}
          scheduleNewAppointment={scheduleNewAppointment}
          mutateAsyncEdit={mutateAsyncEdit}
          appointmentForm={appointmentForm}
        />
      );
      break;
    default:
      content = null;
      break;
  }

  return (
    <Modal
      title={modalTitle.title}
      visible={visible}
      width={780}
      onCancel={onClose}
      borderedHeader={false}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={modalTitle.onClick}
          loading={isLoadingEdit}
          style={{ textTransform: 'uppercase' }}
        >
          {t('save')}
        </Button>
      }
    >
      {content}
    </Modal>
  );
};

export default AppointmentStart;
