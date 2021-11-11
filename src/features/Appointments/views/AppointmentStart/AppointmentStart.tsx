/* eslint-disable radix */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { editAppointment } from '../../services';
import StartAppointmentContent from '../../components/AppointmentModalContent/StartAppointmentContent/StartAppointmentContent';
import NewPrescription from '../../../Patients/components/Prescriptions/NewPrescription/NewPrescription';

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
  const [prescriptionForm] = Form.useForm();

  const [contentType, setContentType] = useState<'info' | 'new-prescription'>('info');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);

  let content = null;
  let modalHeaderInfo: { title: string; onClick: () => void } | null = null;

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
          setContentType={setContentType}
        />
      );
      modalHeaderInfo = {
        title: t('start appointment'),
        onClick: appointmentForm.submit,
      };
      break;
    case 'new-prescription':
      content = <NewPrescription form={prescriptionForm} />;
      modalHeaderInfo = {
        title: t('new prescription'),
        onClick: prescriptionForm.submit,
      };
      break;
    default:
      content = null;
      modalHeaderInfo = null;
      break;
  }

  return (
    <Modal
      title={modalHeaderInfo?.title}
      visible={visible}
      width={780}
      onCancel={onClose}
      borderedHeader={false}
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={modalHeaderInfo?.onClick}
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
