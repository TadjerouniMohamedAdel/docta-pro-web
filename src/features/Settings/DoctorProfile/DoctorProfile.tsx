import React, { useState } from 'react';
import { Col, Row, Avatar, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { FormikProps, useFormik } from 'formik';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import CabinetInfo from './CabinetInfo/CabinetInfo';
import { AddressForm, DoctorCabinetInfoForm, DoctorPersonalInfoForm } from './types';

type Props = {};

const DoctorProfile: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const [activeKey, setActiveKey] = useState<string>('1');

  const [doctorPersonalInfoForm, setDoctorPersonalInfoForm] = useState<DoctorPersonalInfoForm>({
    picture: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: undefined,
    mainSpecialty: undefined,
    secondarySpecialty: undefined,
    biography: '',
    diplomas: [],
    languages: [],
  });

  const [doctorCabinetInfoForm, setDoctorCabinetInfoForm] = useState<DoctorCabinetInfoForm>({
    services: [],
    images: [],
    addressForm: {
      address: '',
      state: undefined,
      city: undefined,
    },
    location: {
      lat: 0,
      lng: 0,
    },
  });

  const handleTabsChange = (value: string) => {
    setActiveKey(value);
  };

  // personal info handlers-------------------------------------------
  const updateDoctorPersonalInfo = (values: DoctorPersonalInfoForm) => {
    setDoctorPersonalInfoForm(values);
  };

  const handleSavePersonalInfo = () => {
    console.log('doctorPersonalInfoForm', doctorPersonalInfoForm);
  };

  const doctorPersonalInfoFormik: FormikProps<DoctorPersonalInfoForm> = useFormik({
    initialValues: doctorPersonalInfoForm,
    onSubmit: () => {
      handleSavePersonalInfo();
    },
  });

  const { handleSubmit: submitDoctorPersonalInfoForm } = doctorPersonalInfoFormik;

  // cabinet info handlers-------------------------------------------
  const updateDoctorCabinetInfo = (values: DoctorCabinetInfoForm) => {
    setDoctorCabinetInfoForm(values);
  };

  const handleSaveCabinetInfo = () => {
    console.log('doctorCabinetInfoForm', doctorCabinetInfoForm);
  };

  const { addressForm } = doctorCabinetInfoForm;

  const doctorCabinetInfoFormik: FormikProps<AddressForm> = useFormik({
    initialValues: addressForm,
    onSubmit: () => {
      handleSaveCabinetInfo();
    },
  });

  const { handleSubmit: submitDoctorCabinetInfoForm } = doctorCabinetInfoFormik;

  const getAction = () => {
    switch (activeKey) {
      case '1':
        return (
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            size="small"
            onClick={() => submitDoctorPersonalInfoForm()}
            //   loading={isLoading}
          >
            {t('save')}
          </Button>
        );

      case '2':
        return (
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            size="small"
            onClick={() => submitDoctorCabinetInfoForm()}
            //   loading={isLoading}
          >
            {t('save')}
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar src="" size={54} />
          </Col>
          <Col flex={1}>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              Dr.Mahmud Abu Hasan
            </Text>
            <br />
            <Text type="secondary" style={{ fontWeight: 500 }}>
              Cardiologist - Residence El Khelil N 41, Said Hamdine, Alger
            </Text>
          </Col>
          <Col>{getAction()}</Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
          onChange={handleTabsChange}
        >
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="profile-line" />}> {t('personal info')} </Tab>}
            key="1"
          >
            <PersonalInfo
              data={doctorPersonalInfoForm}
              formik={doctorPersonalInfoFormik}
              handleUpdateData={updateDoctorPersonalInfo}
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="health-book-line" />}>{t('cabinet info')}</Tab>}
            key="2"
          >
            <CabinetInfo
              data={doctorCabinetInfoForm}
              formik={doctorCabinetInfoFormik}
              handleUpdateData={updateDoctorCabinetInfo}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DoctorProfile;
