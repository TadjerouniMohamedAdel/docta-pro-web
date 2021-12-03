import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { ProtectedComponent } from '../../../Auth';
import { useUpdateAppointment } from '../../hooks';
import AppointmentDetailsContent from '../../components/AppointmentModalContent/AppointmentDetailsContent/AppointmentDetailsContent';
import NewPrescription from '../../components/Prescriptions/NewPrescription/NewPrescription';
import { PrescriptionForm } from '../../types';
import ModalTitleWithBackButton from '../../../../components/ModalTitleWithBackButton/ModalTitleWithBackButton';
import EditPrescription from '../../components/Prescriptions/EditPrescription/EditPrescription';

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

  const [prescriptionInitialValues, setPrescriptionInitialValues] = useState<PrescriptionForm>({
    note: '',
    diagnostic: '',
    medications: [],
  });

  const [appointmentDetailsform] = Form.useForm();
  const [addPrescriptionForm] = Form.useForm();
  const [editPrescriptionForm] = Form.useForm();
  // 'info' | 'new-prescription' | 'edit-prescription';
  const [contentType, setContentType] = useState('info');
  // 'details' | 'notes' | 'prescriptions';
  const [selectedInfoTab, setSelectedInfoTab] = useState('details');

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useUpdateAppointment();

  const handleSave = () => {
    if (contentType === 'info') {
      appointmentDetailsform.submit();
      return;
    }
    if (contentType === 'new-prescription') {
      addPrescriptionForm.submit();
      return;
    }
    if (contentType === 'edit-prescription') {
      editPrescriptionForm.submit();
    }
  };

  const backToPrescriptions = () => {
    setContentType('info');
    setSelectedInfoTab('prescriptions');
  };

  // we just reset content type, all content inside the modal is reset on close
  useEffect(() => {
    if (!visible) {
      setContentType('info');
      setSelectedInfoTab('details');
    }
  }, [visible]);

  let modalHeaderInfo = null;
  let content = null;

  switch (contentType) {
    case 'info':
      modalHeaderInfo = {
        title: t('appointment details'),
      };
      content = (
        <AppointmentDetailsContent
          onClose={onClose}
          appointmentId={appointmentId}
          patientId={patientId}
          prescriptionId={selectedPrescriptionId}
          currentDate={currentDate}
          mutateAsyncEdit={mutateAsyncEdit}
          appointmentForm={appointmentDetailsform}
          contentType={contentType}
          setContentType={setContentType}
          setSelectedPrescriptionId={setSelectedPrescriptionId}
          setPrescriptionInitialValues={setPrescriptionInitialValues}
          selectedTab={selectedInfoTab}
          setSelectedTab={setSelectedInfoTab}
        />
      );
      break;
    case 'new-prescription':
      modalHeaderInfo = {
        title: (
          <ModalTitleWithBackButton title={t('new prescription')} goBack={backToPrescriptions} />
        ),
      };
      content = (
        <NewPrescription
          patientId={patientId}
          appointmentId={appointmentId}
          form={addPrescriptionForm}
          backToPrescriptions={backToPrescriptions}
          initialValues={prescriptionInitialValues}
        />
      );
      break;
    case 'edit-prescription':
      modalHeaderInfo = {
        title: (
          <ModalTitleWithBackButton title={t('edit prescription')} goBack={backToPrescriptions} />
        ),
      };
      content = (
        <EditPrescription
          patientId={patientId}
          prescriptionId={selectedPrescriptionId}
          form={editPrescriptionForm}
          backToPrescriptions={backToPrescriptions}
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
      borderedHeader
      style={{ top: 30 }}
      destroyOnClose
      actions={
        <ProtectedComponent accessCode="edit/appointments">
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            onClick={handleSave}
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
