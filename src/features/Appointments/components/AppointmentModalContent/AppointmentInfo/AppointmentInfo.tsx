import React from 'react';
import { FormInstance, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { Icon, Tab } from '../../../../../components';
import AppointmentSelection from '../../AppointmentSelection/AppointmentSelection';
import { AppointmentForm, PrescriptionForm } from '../../../types';
import { PatientNotes } from '../../../../Patients';
import Prescriptions from '../../Prescriptions/Prescriptions';

type Props = {
  onClose: () => void;
  onEditSave: (values: AppointmentForm) => void;
  appointmentId: string;
  patientId: string;
  prescriptionId: string;
  currentDate: Date;
  appointmentForm: FormInstance;
  setContentType: (contentType: string) => void;
  setSelectedPrescriptionId: (id: string) => void;
  setPrescriptionInitialValues: (initialValues: PrescriptionForm) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

const AppointmentInfo: React.FC<Props> = ({
  onClose,
  appointmentId,
  currentDate,
  onEditSave,
  appointmentForm,
  patientId,
  prescriptionId,
  setContentType,
  setSelectedPrescriptionId,
  setPrescriptionInitialValues,
  selectedTab,
  setSelectedTab,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  return (
    <Tabs
      tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
      activeKey={selectedTab}
      onChange={setSelectedTab}
    >
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="calendar-todo-line" />}>{t('appointment details')}</Tab>}
        key="details"
      >
        <AppointmentSelection
          onClose={onClose}
          appointmentId={appointmentId}
          currentDate={currentDate}
          onEditSave={onEditSave}
          form={appointmentForm}
        />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="file-text-line" />}> {t('notes')} </Tab>}
        key="notes"
      >
        <div style={{ height: 500, overflowY: 'auto' }}>
          <PatientNotes patientId={patientId} />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="file-text-line" />}> {t('prescriptions')} </Tab>}
        key="prescriptions"
      >
        <Prescriptions
          patientId={patientId}
          prescriptionId={prescriptionId}
          setContentType={setContentType}
          setSelectedPrescriptionId={setSelectedPrescriptionId}
          setPrescriptionInitialValues={setPrescriptionInitialValues}
        />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AppointmentInfo;
