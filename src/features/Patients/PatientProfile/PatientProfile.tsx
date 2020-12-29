import { Tabs } from 'antd';
import React from 'react';
import Tab from '../../../components/Tab/Tab';
import Icon from '../../../components/Icon/Icon';
// import PersonalInfo from './PersonalInfo/PersonalInfo';
// import MedicalRecords f  rom './MedicalRecords/MedicalRecords';
import VisitsHistory from './VisitsHistory/VisitsHistory';
import './styles.less';

type Props = {};

const PatientProfile: React.FC<Props> = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
      className="patient-profile-tab"
    >
      <Tabs.TabPane tab={<Tab icon={<Icon name="profile-line" />}>Personal info</Tab>} key="1">
        <div style={{ padding: '16px 80px' }}>{/* <PersonalInfo /> */}</div>
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="health-book-line" />}>Medical Record</Tab>} key="2">
        {/* <MedicalRecords /> */}
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="history-line" />}>Visits History</Tab>} key="3">
        <VisitsHistory />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PatientProfile;
