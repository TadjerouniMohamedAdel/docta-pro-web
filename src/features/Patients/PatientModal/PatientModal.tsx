import React, { useState } from 'react';
import { Tabs } from 'antd';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from '../PatientProfile/PersonalInfo/PersonalInfo';
import MedicalRecords from '../PatientProfile/MedicalRecords/MedicalRecords';
import { FormField, MedicalItems, MedicalRecordsForm, PersonalInfoForm } from '../types';
import i18n from '../../../i18n';
import { addNewPatient } from '../services';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
};

const PatientModal: React.FC<Props> = ({ visible = false, setVisible }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const personalInfoFormInitialValues: PersonalInfoForm = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: null,
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
    onSubmit: () => {},
    isInitialValid: false,
  });

  const { handleSubmit, isValid } = personalInfoFormik;

  const handlePersonalInfoFormChange = ({ key, value }: FormField) => {
    setPersonalInfoForm({ ...personalInfoForm, [key]: value });
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
        await mutateAsync({
          ...personalInfoForm,
          phone: personalInfoForm.phone,
          ...medicalRecordsForm,
        });
        setPersonalInfoForm(personalInfoFormInitialValues);
        setMedicalRecordsForm(medicalRecordsFormInitialValues);
        setVisible(false);
      } catch (error) {
        console.log(error);
      }
    }
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
        <Button
          type="primary"
          icon={<Icon name="save-line" />}
          onClick={handleSavePatient}
          loading={isLoading}
        >
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
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
};

export default PatientModal;
