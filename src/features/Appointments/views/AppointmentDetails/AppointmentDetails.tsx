import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { ProtectedComponent } from '../../../Auth';
import { useUpdateAppointment } from '../../hooks';
import AppointmentDetailsContent from '../../components/AppointmentModalContent/AppointmentDetailsContent/AppointmentDetailsContent';
import NewPrescription from '../../../Patients/components/Prescriptions/NewPrescription/NewPrescription';
import { AppointmentModalContentTypes } from '../../types';

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
  const [prescriptionForm] = Form.useForm();

  const [contentType, setContentType] = useState<AppointmentModalContentTypes>('prescriptions');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useUpdateAppointment();

  let modalHeaderInfo = null;
  let content = null;

  switch (contentType) {
    case 'prescriptions':
      modalHeaderInfo = {
        title: t('appointment details'),
        onClick: appointmentForm.submit,
      };
      content = (
        <AppointmentDetailsContent
          onClose={onClose}
          appointmentId={appointmentId}
          patientId={patientId}
          currentDate={currentDate}
          mutateAsyncEdit={mutateAsyncEdit}
          appointmentForm={appointmentForm}
          setContentType={setContentType}
        />
      );
      break;
    case 'new-prescription':
      modalHeaderInfo = {
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              className="modal-back-button"
              onClick={() => setContentType('prescriptions')}
            >
              <Icon name="arrow-left-line" style={{ color: '#273151', fontSize: 17 }} />
            </button>

            <span style={{ marginLeft: 16, marginRight: 16 }}>{t('new prescription')}</span>
          </div>
        ),
        onClick: prescriptionForm.submit,
      };
      content = (
        <NewPrescription
          patientId={patientId}
          appointmentId={appointmentId}
          form={prescriptionForm}
          backToPrescriptions={() => setContentType('prescriptions')}
        />
      );
      break;
    default:
      modalHeaderInfo = null;
      content = null;
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
        <ProtectedComponent accessCode="edit/appointments">
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            onClick={modalHeaderInfo?.onClick}
            loading={isLoadingEdit}
            style={{ textTransform: 'uppercase' }}
          >
            {t('save')}
          </Button>
        </ProtectedComponent>
      }
    >
      {content}
    </Modal>
  );
};

export default AppointmentDetails;
