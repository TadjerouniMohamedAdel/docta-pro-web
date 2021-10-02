import React, { useEffect, useState } from 'react';
import { Col, Row, Tabs } from 'antd';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { Button, Icon, Tab, Text, Spacer } from '../../../../../components';
import {
  PatientPersonalInfo,
  PatientMedicalRecords,
  FormField,
  MedicalItems,
  MedicalRecordsForm,
  PersonalInfoForm,
  addNewPatient,
} from '../../../../Patients';
import { Patient } from '../../../types';

type Props = {
  visible: boolean;
  handleSelectPatient: (value: Patient) => void;
  onClose: () => void;
};

const NewPatient: React.FC<Props> = ({ visible, onClose, handleSelectPatient }) => {
  const { t, i18n } = useTranslation(['translation', 'placeholders', 'errors']);

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
      .matches(phoneRegEx, t('errors:must be a valid', { fieldName: t('phone number') })),
    birthday: Yup.date()
      .typeError(t('errors:must be a valid', { fieldName: t('birthday') }))
      .nullable(),
    email: Yup.string().email(t('errors:must be a valid', { fieldName: t('email') })),
  });

  const personalInfoFormik: FormikProps<PersonalInfoForm> = useFormik({
    initialValues: personalInfoForm,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const medicalRecordFormik: FormikProps<MedicalRecordsForm> = useFormik({
    initialValues: medicalRecordsForm,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { handleSubmit, isValid } = personalInfoFormik;

  const handlePersonalInfoFormChange = ({ key, value }: FormField) => {
    if (key === 'state')
      setPersonalInfoForm({ ...personalInfoForm, state: value, city: undefined });
    else setPersonalInfoForm({ ...personalInfoForm, [key]: value });
  };

  const handleMedicalRecordsFormChange = ({ key, value }: any) => {
    setMedicalRecordsForm({ ...medicalRecordsForm, [key]: value });
  };

  const handleAddNewItem = (name: MedicalItems, value: string): void => {
    const dataToUpdate = [...medicalRecordsForm[name]];
    dataToUpdate.push({ name: value });
    handleMedicalRecordsFormChange({ key: name, value: dataToUpdate });
  };

  const handleDeleteItem = (name: MedicalItems, index: number): void => {
    const dataToUpdate = [...medicalRecordsForm[name]];
    dataToUpdate.splice(index, 1);
    handleMedicalRecordsFormChange({ key: name, value: dataToUpdate });
  };

  const { mutateAsync, isLoading } = useMutation(addNewPatient);

  const handleSavePatient = async () => {
    handleSubmit();
    if (isValid) {
      try {
        const response = await mutateAsync({
          ...personalInfoForm,
          email: personalInfoForm.email || undefined,
          phone: personalInfoForm.phone,
          ...medicalRecordsForm,
        });
        handleSelectPatient({
          id: response.patientId,
          firstName: personalInfoForm.firstName,
          lastName: personalInfoForm.lastName,
          birthDate: personalInfoForm.birthDate,
          gender: personalInfoForm.gender,
          generalStatus: personalInfoForm.generalStatus,
          phone: personalInfoForm.phone,
          city: personalInfoForm.city,
          state: personalInfoForm.state,
        });
        setPersonalInfoForm(personalInfoFormInitialValues);
        setMedicalRecordsForm(medicalRecordsFormInitialValues);
        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    setPersonalInfoForm(personalInfoFormInitialValues);
    setMedicalRecordsForm(medicalRecordsFormInitialValues);
  }, [visible]);

  return (
    <div
      style={{
        background: '#fff',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{ height: 96, paddingLeft: 24, paddingRight: 24 }}
      >
        <Col>
          <Spacer size="xs">
            <Button type="text" size="small" onClick={handleClose}>
              <Icon name={i18n.language === 'ar' ? 'arrow-right-line' : 'arrow-left-line'} />
            </Button>
            <Text size="xxxl" style={{ fontWeight: 500 }}>
              {t('new patient')}
            </Text>
          </Spacer>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            onClick={handleSavePatient}
            loading={isLoading}
            style={{ textTransform: 'uppercase' }}
          >
            {t('save')}
          </Button>
        </Col>
      </Row>
      <Tabs
        defaultActiveKey="1"
        tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
        className="patient-profile-tab"
      >
        <Tabs.TabPane
          tab={<Tab icon={<Icon name="profile-line" />}>{t('personal info')} </Tab>}
          key="1"
        >
          <div style={{ padding: '16px 40px' }}>
            <PatientPersonalInfo
              handleFormChange={handlePersonalInfoFormChange}
              formik={personalInfoFormik}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={<Tab icon={<Icon name="health-book-line" />}>{t('medical record')}</Tab>}
          key="2"
        >
          <PatientMedicalRecords
            medicalRecordsForm={medicalRecordsForm}
            handleFormChange={handleMedicalRecordsFormChange}
            handleAddNewItem={handleAddNewItem}
            handleDeleteItem={handleDeleteItem}
            formik={medicalRecordFormik}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default NewPatient;
