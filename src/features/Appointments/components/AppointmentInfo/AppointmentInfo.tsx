import React from 'react';
import { FormInstance, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { Icon, Tab } from '../../../../components';
import AppointmentSelection from '../AppointmentSelection/AppointmentSelection';
import { AppointmentForm } from '../../types';

type Props = {
  onClose: () => void;
  onEditSave: (values: AppointmentForm) => void;
  appointmentId: string;
  patientId?: string;
  currentDate: Date;
  appointmentForm: FormInstance;
};

const AppointmentInfo: React.FC<Props> = ({
  onClose,
  appointmentId,
  currentDate,
  onEditSave,
  appointmentForm,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  return (
    <Tabs tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}>
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
    </Tabs>
  );
};

export default AppointmentInfo;
