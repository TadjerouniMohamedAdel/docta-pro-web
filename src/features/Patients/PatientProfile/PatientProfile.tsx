import { Col, Row, Tabs, Avatar, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import i18n from '../../../i18n';
import Tab from '../../../components/Tab/Tab';
import Icon from '../../../components/Icon/Icon';
import Text from '../../../components/Text/Text';
import Button from '../../../components/Button/Button';
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
  SelectedPatient,
} from '../types';
import { fetchPatientDetails, updatePatient, deletePatientItem } from '../services';

type Props = {
  selectedPatient?: SelectedPatient;
  setSelectedPatient: (values: SelectedPatient) => void;
};

const PatientProfile: React.FC<Props> = ({ selectedPatient, setSelectedPatient }) => {
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

  const medicalRecordFormik: FormikProps<MedicalRecordsForm> = useFormik({
    initialValues: medicalRecordsForm,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const handleFetchPersonalInfo = async () => {
    try {
      const response: { data: FetchPersonalInfoResponse } = await fetchPatientDetails(
        selectedPatient?.id,
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
        selectedPatient?.id,
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

  const queryClient = useQueryClient();

  const handlePersonalInfoFormChange = async ({ key, value }: FormField) => {
    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, 'personal-info', { [key]: value });
        setSelectedPatient({ ...selectedPatient, [key]: value });
        queryClient.invalidateQueries('patients');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMedicalRecordsFormChange = async ({ key, value }: any) => {
    try {
      if (selectedPatient) {
        await updatePatient(selectedPatient.id, 'medical-info', { [key]: value });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewItem = async (name: MedicalItems, value: string) => {
    try {
      if (selectedPatient) {
        const response = await updatePatient(selectedPatient.id, name, { item: value });
        setMedicalRecordsForm({
          ...medicalRecordsForm,
          [name]: [...medicalRecordsForm[name], { id: response.id, name: value }],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteItem = async (name: MedicalItems, index: number) => {
    try {
      if (selectedPatient) {
        await deletePatientItem(selectedPatient.id, medicalRecordsForm[name][index].id || '', name);
        const dataToUpdate = [...medicalRecordsForm[name]];
        dataToUpdate.splice(index, 1);
        setMedicalRecordsForm({
          ...medicalRecordsForm,
          [name]: dataToUpdate,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    if (selectedPatient) handlegetPatientDetails();
  }, [selectedPatient, activeKey]);

  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Row align="middle" gutter={16}>
          <Col>
            {selectedPatient?.picture ? (
              <Avatar src={selectedPatient?.picture} size="large" />
            ) : (
              <Avatar src={selectedPatient?.picture} size="large">
                {selectedPatient?.firstName[0].toUpperCase()}
                {selectedPatient?.lastName[0].toUpperCase()}
              </Avatar>
            )}
          </Col>
          <Col flex={1}>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              {selectedPatient?.firstName} {selectedPatient?.lastName}
            </Text>
            <br />
            <Text type="secondary" style={{ fontWeight: 500 }}>
              {selectedPatient?.state} - {selectedPatient?.city}
            </Text>
          </Col>
          <Col>
            <Button
              ghost
              type="primary"
              icon={<Icon name="chat-2-line" />}
              style={{ display: 'flex' }}
              size="small"
            >
              Message
            </Button>
          </Col>
          <Col>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item> more actions</Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <Button type="default" size="small">
                <Icon name="more-2-fill" size={24} />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
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
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="health-book-line" />}>Medical Record</Tab>}
            key="2"
          >
            <MedicalRecords
              medicalRecordsForm={medicalRecordsForm}
              handleFormChange={handleMedicalRecordsFormChange}
              handleAddNewItem={handleAddNewItem}
              handleDeleteItem={handleDeleteItem}
              formik={medicalRecordFormik}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<Tab icon={<Icon name="history-line" />}>Visits History</Tab>} key="3">
            <VisitsHistory />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default PatientProfile;
