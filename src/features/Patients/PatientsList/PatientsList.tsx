import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import BlockedPatients from './BlockedPatients/BlockedPatients';
import AllPatients from './AllPatients/AllPatients';

type Props = {
  handleSetPatientCount: (value: number) => void;
};

const PatientsList: React.FC<Props> = ({ handleSetPatientCount }) => {
  const { t } = useTranslation('translation');

  return (
    <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }} size="small">
      <Tabs.TabPane tab={t('all patients')} key="1">
        <AllPatients handleSetPatientCount={handleSetPatientCount} />
      </Tabs.TabPane>
      <Tabs.TabPane tab={t('blocked patients')} key="2">
        <BlockedPatients />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PatientsList;
