import React from 'react';
import { Tabs } from 'antd';
import Button from '../../../../components/Button/Button';
import Modal from '../../../../components/Modal/Modal';
import Icon from '../../../../components/Icon/Icon';
import Tab from '../../../../components/Tab/Tab';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import MedicalRecords from '../MedicalRecords/MedicalRecords';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
};

const PatientModal: React.FC<Props> = ({ visible = false, setVisible }) => {
  return (
    <Modal
      title="Add a patient"
      visible={visible}
      width={780}
      onCancel={() => setVisible(false)}
      actions={
        <Button type="primary" icon={<Icon name="save" />}>
          SAVE
        </Button>
      }
    >
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
        className="patient-profile-tab"
      >
        <Tabs.TabPane tab={<Tab icon={<Icon name="profile" />}>Personal info</Tab>} key="1">
          <PersonalInfo />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<Tab icon={<Icon name="health-book" />}>Medical Record</Tab>} key="2">
          <MedicalRecords />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default PatientModal;
