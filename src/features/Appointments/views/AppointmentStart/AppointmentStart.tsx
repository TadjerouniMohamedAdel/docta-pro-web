import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Form } from 'antd';
import { Button, Modal, Icon } from '../../../../components';
import { editAppointment } from '../../services';
import StartAppointmentContent from '../../components/AppointmentModalContent/StartAppointmentContent/StartAppointmentContent';
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

  const [prescriptionInitialValues, setPrescriptionInitialValues] = useState<PrescriptionForm>({
    note: '',
    diagnostic: '',
    medications: [],
  });

  const [appointmentDetailsform] = Form.useForm();
  const [addPrescriptionForm] = Form.useForm();
  const [editPrescriptionForm] = Form.useForm();

  // 'info' | 'new-prescription' | 'edit-prescription';
  const [selectedInfoTab, setSelectedInfoTab] = useState('details');
  // 'info' | 'new-prescription' | 'edit-prescription';
  const [contentType, setContentType] = useState('info');

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState('');

  const { mutateAsync: mutateAsyncEdit, isLoading: isLoadingEdit } = useMutation(editAppointment);

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

  let content = null;
  let modalHeaderInfo = null;

  switch (contentType) {
    case 'info':
      modalHeaderInfo = {
        title: t('start appointment'),
      };
      content = (
        <StartAppointmentContent
          onClose={onClose}
          appointmentId={appointmentId}
          patientId={patientId}
          prescriptionId={selectedPrescriptionId}
          currentDate={currentDate}
          scheduleNewAppointment={scheduleNewAppointment}
          mutateAsyncEdit={mutateAsyncEdit}
          appointmentForm={appointmentDetailsform}
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
      destroyOnClose
      actions={
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={handleSave}
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
