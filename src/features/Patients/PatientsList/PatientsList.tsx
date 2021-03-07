import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
// import BlockedPatients from './BlockedPatients/BlockedPatients';
import AllPatients from './AllPatients/AllPatients';
import './styles.less';
import { SelectedPatient } from '../types';

type Props = {
  handleSetPatientCount: (value: number) => void;
  selectedPatient?: SelectedPatient;
  setSelectedPatient: (values: SelectedPatient) => void;
};

const PatientsList: React.FC<Props> = ({
  handleSetPatientCount,
  selectedPatient,
  setSelectedPatient,
}) => {
  const { t } = useTranslation('translation');

  return (
    <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }} size="small">
      <Tabs.TabPane tab={t('all patients')} key="1">
        <AllPatients
          handleSetPatientCount={handleSetPatientCount}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      </Tabs.TabPane>
      {/* <Tabs.TabPane tab={t('blocked patients')} key="2">
        <BlockedPatients
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      </Tabs.TabPane> */}
    </Tabs>
  );
};

export default PatientsList;
