import { Col, Row, Tabs, Avatar, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
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
import { fetchPatientDetails, updatePatient, deletePatientItem, unblockPatient } from '../services';
import Spacer from '../../../components/Spacer/Spacer';
import BlockPatientModal from './BlockPatientModal/BlockPatientModal';

type Props = {
  selectedPatient?: SelectedPatient;
  setSelectedPatient: (values: SelectedPatient) => void;
};

const PatientProfile: React.FC<Props> = ({ selectedPatient, setSelectedPatient }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const [activeKey, setActiveKey] = useState<string>('1');
  const [showBlockPatientModal, setShowBlockPatientModal] = useState<boolean>(false);

  const personalInfoFormInitialValues: PersonalInfoForm = {
    firstName: '',
    lastName: '',
    phone: '',
    email: undefined,
    birthDate: '',
    gender: undefined,
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
    married: undefined,
    smoking: undefined,
    alcohol: undefined,
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
        state: response.data.state?.id,
        city: response.data.city?.id,
        generalStatus: response.data.generalStatus,
        picture: response.data.picture,
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
        if (key === 'state') {
          await updatePatient(selectedPatient.id, 'personal-info', { state: value, city: null });
          setSelectedPatient({ ...selectedPatient, [key]: value });
        } else {
          await updatePatient(selectedPatient.id, 'personal-info', { [key]: value });
          setSelectedPatient({ ...selectedPatient, [key]: value });
        }
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

  const handleGetPatientDetails = () => {
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

  const handleBlockPatient = () => {
    setShowBlockPatientModal(true);
  };

  const { mutateAsync: mutateUnblockPatient, isLoading: unblockPatientLoading } = useMutation(
    unblockPatient,
  );

  const handleUnBlockPatient = async () => {
    if (selectedPatient?.id) {
      await mutateUnblockPatient(selectedPatient.id);
      queryClient.invalidateQueries(['blocked-patients']);
      queryClient.invalidateQueries(['patients']);
      setSelectedPatient({ ...selectedPatient, blocked: false });
    }
  };

  useEffect(() => {
    if (selectedPatient) handleGetPatientDetails();
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
              {selectedPatient?.state?.name} - {selectedPatient?.city?.name}
            </Text>
          </Col>
          {/* <Col>
            <Button
              ghost
              type="primary"
              icon={<Icon name="chat-2-line" />}
              style={{ display: 'flex' }}
              size="small"
            >
              Message
            </Button>
          </Col> */}
          {selectedPatient?.blocked && selectedPatient?.registered ? (
            <Col>
              <Spacer size="xs">
                <Text type="danger">
                  <Icon name="admin-line" />
                </Text>
                <Text size="lg" type="danger" style={{ fontWeight: 500 }}>
                  {t('patient blocked')}
                </Text>
              </Spacer>
            </Col>
          ) : null}

          <Col>
            <Dropdown
              overlay={
                <Menu>
                  {!selectedPatient?.blocked && selectedPatient?.registered ? (
                    <Menu.Item onClick={handleBlockPatient}>
                      <Spacer size="sm">
                        <Text type="danger">
                          <Icon name="admin-line" size={18} />
                        </Text>
                        <Text type="danger">{t('block patient')}</Text>
                      </Spacer>
                    </Menu.Item>
                  ) : null}
                  {selectedPatient?.blocked ? (
                    <Menu.Item onClick={handleUnBlockPatient}>
                      <Spacer size="sm">
                        <Icon name="user-follow-line" size={18} />
                        <Text>{t('unblock patient')}</Text>
                      </Spacer>
                    </Menu.Item>
                  ) : null}
                </Menu>
              }
              trigger={['click']}
            >
              <Button type="default" size="small" loading={unblockPatientLoading}>
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
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="profile-line" />}>{t('personal info')}</Tab>}
            key="1"
          >
            <div style={{ padding: '16px 80px' }}>
              <PersonalInfo
                handleFormChange={handlePersonalInfoFormChange}
                formik={personalInfoFormik}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="health-book-line" />}>{t('medical record')}</Tab>}
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
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="history-line" />}> {t('visits history')} </Tab>}
            key="3"
          >
            <VisitsHistory patientId={selectedPatient?.id} />
          </Tabs.TabPane>
        </Tabs>
        <BlockPatientModal
          visible={showBlockPatientModal}
          setVisible={setShowBlockPatientModal}
          patient={selectedPatient}
          setPatient={setSelectedPatient}
        />
      </div>
    </>
  );
};

export default PatientProfile;
