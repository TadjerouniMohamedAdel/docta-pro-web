import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { editAppointment } from '../../services';
import StartAppointmentContent from '../../components/AppointmentModalContent/StartAppointmentContent/StartAppointmentContent';
import NewPrescription from '../../components/Prescriptions/NewPrescription/NewPrescription';
import { AppointmentModalContentTypes } from '../../types';
import ModalTitleWithBackButton from '../../../../components/ModalTitleWithBackButton/ModalTitleWithBackButton';
import EditPrescription from '../../components/Prescriptions/EditPrescription/EditPrescription';

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

  const [form] = Form.useForm();

  const [contentType, setContentType] = useState<AppointmentModalContentTypes>('prescriptions');

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);

  let content = null;
  let modalHeaderInfo = null;

  switch (contentType) {
    case 'prescriptions':
      modalHeaderInfo = {
        title: t('start appointment'),
      };
      content = (
        <StartAppointmentContent
          onClose={onClose}
          appointmentId={appointmentId}
          patientId={patientId}
          currentDate={currentDate}
          scheduleNewAppointment={scheduleNewAppointment}
          mutateAsyncEdit={mutateAsyncEdit}
          appointmentForm={form}
          setContentType={setContentType}
          setSelectedPrescriptionId={setSelectedPrescriptionId}
        />
      );

      break;
    case 'new-prescription':
      modalHeaderInfo = {
        title: t('new prescription'),
      };
      content = (
        <NewPrescription
          patientId={patientId}
          appointmentId={appointmentId}
          form={form}
          backToPrescriptions={() => setContentType('prescriptions')}
        />
      );
      break;
    case 'edit-prescription':
      modalHeaderInfo = {
        title: (
          <ModalTitleWithBackButton
            title={t('edit prescription')}
            goBack={() => setContentType('prescriptions')}
          />
        ),
      };
      content = (
        <EditPrescription
          patientId={patientId}
          prescriptionId={selectedPrescriptionId}
          form={form}
          backToPrescriptions={() => setContentType('prescriptions')}
        />
      );
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
          onClick={form.submit}
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
