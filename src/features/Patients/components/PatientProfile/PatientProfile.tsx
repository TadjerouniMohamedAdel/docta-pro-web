import { Tabs } from 'antd';
import React from 'react';
import Tab from '../../../../components/Tab/Tab';
import Icon from '../../../../components/Icon/Icon';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import MedicalRecords from '../MedicalRecords/MedicalRecords';
import VisitsHistory from '../VisitsHistory/VisitsHistory';
import './styles.less';

type Props = {};

const PatientProfile: React.FC<Props> = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
      className="patient-profile-tab"
    >
      <Tabs.TabPane tab={<Tab icon={<Icon name="profile" />}>Personal info</Tab>} key="1">
        <PersonalInfo />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Tab icon={<Icon name="health-book" type="fill" />}>Medical Record</Tab>}
        key="2"
      >
        <MedicalRecords />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="history" />}>Visits History</Tab>} key="3">
        <VisitsHistory />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PatientProfile;
