import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { ProtectedComponent } from '../../../Auth';
import { useUpdateAppointment } from '../../hooks';
import AppointmentDetailsContent from '../../components/AppointmentModalContent/AppointmentDetailsContent/AppointmentDetailsContent';
import NewPrescription from '../../../Patients/components/Prescriptions/NewPrescription/NewPrescription';

type Props = {
  visible: boolean;
  onClose: () => void;
  appointmentId: string;
  patientId: string;
  currentDate: Date;
  setContentType?: (contentType: 'info' | 'new-prescription') => void;
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

  const [contentType, setContentType] = useState<'info' | 'new-prescription'>('info');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useUpdateAppointment();

  let content = null;
  let modalTitle = null;

  switch (contentType) {
    case 'info':
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
      modalTitle = {
        title: t('appointment details'),
        onClick: appointmentForm.submit,
      };
      break;
    case 'new-prescription':
      content = <NewPrescription />;
      modalTitle = {
        title: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              style={{
                background: '#F5F7FB',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #F5F7FB',
                cursor: 'pointer',
              }}
              onClick={() => setContentType('info')}
            >
              <Icon name="arrow-left-line" style={{ color: '#273151', fontSize: 17 }} />
            </button>

            <span style={{ marginLeft: 16, marginRight: 16 }}>{t('new prescription')}</span>
          </div>
        ),
        onClick: prescriptionForm.submit,
      };
      break;
    default:
      content = null;
      break;
  }

  return (
    <Modal
      title={modalTitle?.title}
      visible={visible}
      width={780}
      onCancel={onClose}
      borderedHeader={false}
      actions={
        <ProtectedComponent accessCode="edit/appointments">
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            onClick={modalTitle?.onClick}
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
