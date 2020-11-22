import React from 'react';
import { Tabs } from 'antd';
import Tab from '../../../components/Tab/Tab';
import BlockedPatients from './BlockedPatients/BlockedPatients';
import AllPatients from './AllPatients/AllPatients';

type Props = {};

const PatientsList: React.FC<Props> = () => {
  return (
    <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }} size="small">
      <Tabs.TabPane tab={<Tab>All Patients</Tab>} key="1">
        <AllPatients />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Blocked Patients" key="2">
        <BlockedPatients />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PatientsList;
