import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import Tab from '../../../components/Tab/Tab';
import Icon from '../../../components/Icon/Icon';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
import MedicalRecords from '../MedicalRecords/MedicalRecords';
import VisitsHistory from './VisitsHistory/VisitsHistory';
import './styles.less';
import {
  FetchMedicalRecordResponse,
  FetchPersonalInfoResponse,
  FormField,
  MedicalRecordsForm,
  PersonalInfoForm,
  MedicalItems,
} from '../types';
import { fetchPatientDetails } from '../services';

type Props = {
  patientId?: string;
};

const PatientProfile: React.FC<Props> = ({ patientId }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const [activeKey, setActiveKey] = useState<string>('1');

  const personalInfoFormInitialValues: PersonalInfoForm = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: '',
    state: undefined,
    city: undefined,
    generalStatus: '',
  };

  const [personalInfoForm, setPersonalInfoForm] = useState<PersonalInfoForm>(
    personalInfoFormInitialValues,
  );

  const medicalRecordsFormInitialValues: MedicalRecordsForm = {
    height: undefined,
    weight: undefined,
    bloodType: undefined,
    married: null,
    smoking: null,
    alcohol: null,
    medications: [],
    allergies: [],
    surgeries: [],
    chronicIllnesses: [],
  };

  const [medicalRecordsForm, setMedicalRecordsForm] = useState<MedicalRecordsForm>(
    medicalRecordsFormInitialValues,
  );

  const phoneRegEx = /(\+[0-9]{11,12})/;

  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    firstName: Yup.string().required(t('errors:required field')),
    lastName: Yup.string().required(t('errors:required field')),
    phone: Yup.string()
      .required(t('errors:required field'))
      .matches(phoneRegEx, i18n.t('errors:must be a valid', { fieldName: t('phone number') })),
    birthday: Yup.date()
      .typeError(i18n.t('errors:must be a valid', { fieldName: t('birthday') }))
      .nullable(),
    email: Yup.string().email(i18n.t('errors:must be a valid', { fieldName: t('email') })),
  });

  const personalInfoFormik: FormikProps<PersonalInfoForm> = useFormik({
    initialValues: personalInfoForm,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
    isInitialValid: false,
  });

  const handleFetchPersonalInfo = async () => {
    try {
      const response: { data: FetchPersonalInfoResponse } = await fetchPatientDetails(
        patientId,
        'personal-info',
      );

      setPersonalInfoForm({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phone: response.data.user.phone,
        email: response.data.user.email,
        birthDate: response.data.birthDate,
        gender: response.data.gender,
        state: response.data.state,
        city: response.data.city,
        generalStatus: response.data.generalStatus,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchMedicalRecord = async () => {
    try {
      const response: { data: FetchMedicalRecordResponse } = await fetchPatientDetails(
        patientId,
        'medical-info',
      );
      setMedicalRecordsForm({
        height: response.data.height,
        weight: response.data.weight,
        bloodType: response.data.bloodType,
        married: response.data.married,
        smoking: response.data.smoking,
        alcohol: response.data.alcohol,
        medications: response.data.medications,
        allergies: response.data.allergies,
        surgeries: response.data.surgeries,
        chronicIllnesses: response.data.chronicIllnesses,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePersonalInfoFormChange = ({ key, value }: FormField) => {
    console.log(key, value);
  };

  const handleMedicalRecordsFormChange = (value: any) => {
    console.log(value);
  };

  const handleAddNewItem = (name: MedicalItems, values: string) => {
    console.log(name, values);
  };

  const handleDeleteItem = (name: MedicalItems, index: number) => {
    console.log(name, index);
  };

  const handlegetPatientDetails = () => {
    switch (activeKey) {
      case '1':
        handleFetchPersonalInfo();
        break;

      case '2':
        handleFetchMedicalRecord();
        break;

      default:
        break;
    }
  };

  const handleTabsChange = (value: string) => {
    setActiveKey(value);
  };

  useEffect(() => {
    console.log('activeKey', activeKey);
    console.log('patientId', patientId);
    if (patientId) handlegetPatientDetails();
  }, [patientId, activeKey]);

  return (
    <Tabs
      defaultActiveKey="1"
      activeKey={activeKey}
      tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
      className="patient-profile-tab"
      onChange={handleTabsChange}
    >
      <Tabs.TabPane tab={<Tab icon={<Icon name="profile-line" />}>Personal info</Tab>} key="1">
        <div style={{ padding: '16px 80px' }}>
          <PersonalInfo
            handleFormChange={handlePersonalInfoFormChange}
            formik={personalInfoFormik}
            patientId={patientId}
          />
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="health-book-line" />}>Medical Record</Tab>} key="2">
        <MedicalRecords
          medicalRecordsForm={medicalRecordsForm}
          handleFormChange={handleMedicalRecordsFormChange}
          handleAddNewItem={handleAddNewItem}
          handleDeleteItem={handleDeleteItem}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab={<Tab icon={<Icon name="history-line" />}>Visits History</Tab>} key="3">
        <VisitsHistory />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default PatientProfile;
