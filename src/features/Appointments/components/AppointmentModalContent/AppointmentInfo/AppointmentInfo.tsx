import React from 'react';
import { FormInstance, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { Icon, Tab } from '../../../../../components';
import AppointmentSelection from '../../AppointmentSelection/AppointmentSelection';
import { AppointmentForm } from '../../../types';
import { PatientNotes } from '../../../../Patients';
import Prescriptions from '../../../../Patients/components/Prescriptions/Prescriptions';

type Props = {
  onClose: () => void;
  onEditSave: (values: AppointmentForm) => void;
  appointmentId: string;
  patientId: string;
  currentDate: Date;
  appointmentForm: FormInstance;
  setContentType: (contentType: 'info' | 'new-prescription') => void;
};

const AppointmentInfo: React.FC<Props> = ({
  onClose,
  appointmentId,
  currentDate,
  onEditSave,
  appointmentForm,
  patientId,
  setContentType,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  return (
    <Tabs tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }} defaultActiveKey="6">
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="calendar-todo-line" />}>{t('appointment details')}</Tab>}
        key="1"
      >
        <AppointmentSelection
          onClose={onClose}
          appointmentId={appointmentId}
          currentDate={currentDate}
          onEditSave={onEditSave}
          form={appointmentForm}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="file-text-line" />}> {t('notes')} </Tab>} key="4">
        <div style={{ height: 500, overflowY: 'auto' }}>
          <PatientNotes patientId={patientId} />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="file-text-line" />}> {t('prescriptions')} </Tab>}
        key="6"
      >
        <Prescriptions patientId={patientId} setContentType={setContentType} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default AppointmentInfo;
