import React, { useState } from 'react';
import { Tabs } from 'antd';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from '../PatientProfile/PersonalInfo/PersonalInfo';
import MedicalRecords from '../PatientProfile/MedicalRecords/MedicalRecords';
import { FormField, PersonalInfoForm } from '../types';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
};

const PatientModal: React.FC<Props> = ({ visible = false, setVisible }) => {
  const [personalInfoForm, setPersonalInfoForm] = useState<PersonalInfoForm>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: null,
    gender: '',
    address: '',
    state: '',
    city: '',
    generalStatus: '',
  });

  const handleFormChange = ({ key, value }: FormField) => {
    setPersonalInfoForm({ ...personalInfoForm, [key]: value });
  };

  const handleSavePatient = () => {
    console.log('save new patient', personalInfoForm);
  };

  return (
    <Modal
      title="Add a patient"
      visible={visible}
      centered
      width={800}
      onCancel={() => setVisible(false)}
      borderedHeader={false}
      actions={
        <Button type="primary" icon={<Icon name="save-line" />} onClick={handleSavePatient}>
          SAVE
        </Button>
      }
    >
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
        className="patient-profile-tab"
      >
        <Tabs.TabPane tab={<Tab icon={<Icon name="profile-line" />}>Personal info</Tab>} key="1">
          <div style={{ padding: '16px 40px' }}>
            <PersonalInfo personalInfoForm={personalInfoForm} handleFormChange={handleFormChange} />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<Tab icon={<Icon name="health-book-line" />}>Medical Record</Tab>}
          key="2"
        >
          <MedicalRecords />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default PatientModal;
