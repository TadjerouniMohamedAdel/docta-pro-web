import React, { useState } from 'react';
import { Tabs } from 'antd';
import { FormikProps, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import Button from '../../../components/Button/Button';
import Modal from '../../../components/Modal/Modal';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from '../PatientProfile/PersonalInfo/PersonalInfo';
import MedicalRecords from '../PatientProfile/MedicalRecords/MedicalRecords';
import { FormField, PersonalInfoForm } from '../types';
import i18n from '../../../i18n';

type Props = {
  visible?: boolean;
  setVisible: (value: boolean) => void;
};

const PatientModal: React.FC<Props> = ({ visible = false, setVisible }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

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

  const formik: FormikProps<PersonalInfoForm> = useFormik({
    initialValues: personalInfoForm,
    validationSchema,
    onSubmit: () => {},
    isInitialValid: false,
  });

  const { handleSubmit, isValid, isInitialValid } = formik;

  const handleFormChange = ({ key, value }: FormField) => {
    setPersonalInfoForm({ ...personalInfoForm, [key]: value });
  };

  const handleSavePatient = async () => {
    handleSubmit();
    console.log('isValid', isValid);
    if (isValid && isInitialValid) console.log('save new patient', personalInfoForm);
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
            <PersonalInfo handleFormChange={handleFormChange} formik={formik} />
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
