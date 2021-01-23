import React, { useEffect, useState } from 'react';
import { Col, Row, Avatar, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { FormikProps, useFormik } from 'formik';
import { useMutation } from 'react-query';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import CabinetInfo from './CabinetInfo/CabinetInfo';
import { CabinetForm, DoctorInfo, DoctorCabinetInfoForm, DoctorPersonalInfoForm } from './types';
import {
  fetchDoctorCabinetProfile,
  fetchDoctorPersonalInfo,
  updateDoctorCabinetProfile,
  updateDoctorPersonalInfo,
} from './services';

type Props = {};

const DoctorProfile: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const [activeKey, setActiveKey] = useState<string>('1');

  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    firstName: '',
    lastName: '',
    specialties: [],
  });

  const [doctorPersonalInfoForm, setDoctorPersonalInfoForm] = useState<DoctorPersonalInfoForm>({
    picture: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthDate: '',
    gender: undefined,
    biography: '',
    diplomas: [],
    languages: [],
  });

  const [doctorCabinetInfoForm, setDoctorCabinetInfoForm] = useState<DoctorCabinetInfoForm>({
    services: [],
    images: [],
    cabinetForm: {
      contactNumber: '',
      secondaryContactNumber: '',
      address: '',
      state: '',
      city: '',
    },
    location: {
      lat: 0,
      lng: 0,
    },
  });

  const getDoctorPersonalInfo = async () => {
    try {
      const { data } = await fetchDoctorPersonalInfo();
      if (data) {
        setDoctorPersonalInfoForm({
          picture: data.picture || '',
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: data.birthDate,
          gender: data.gender,
          biography: data.bio,
          diplomas: data.formations,
          languages: data.languages,
        });
        setDoctorInfo({
          firstName: data.firstName,
          lastName: data.lastName,
          specialties: data.specialties.map((item) => ({ name: item.specialty.name })),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorCabinetInfo = async () => {
    try {
      const { data } = await fetchDoctorCabinetProfile();
      if (data) {
        setDoctorCabinetInfoForm({
          services: data.services,
          images: data.images,
          cabinetForm: {
            contactNumber: data.contactNumber,
            secondaryContactNumber: data.secondaryContactNumber,
            address: data.address,
            state: data.state.name,
            city: data.city.name,
          },
          location: {
            lat: 0,
            lng: 0,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabsChange = (value: string) => {
    setActiveKey(value);
    if (value === '2') getDoctorCabinetInfo();
  };

  // personal info handlers-------------------------------------------
  const handleUpdateDoctorPersonalInfo = (values: DoctorPersonalInfoForm) => {
    setDoctorPersonalInfoForm(values);
  };

  const { mutate: savePersonalInfoMutation, isLoading: isSavePersonalInfoLoading } = useMutation(
    updateDoctorPersonalInfo,
  );

  const handleSavePersonalInfo = async () => {
    savePersonalInfoMutation(doctorPersonalInfoForm);
  };

  const doctorPersonalInfoFormik: FormikProps<DoctorPersonalInfoForm> = useFormik({
    initialValues: doctorPersonalInfoForm,
    enableReinitialize: true,
    onSubmit: () => {
      handleSavePersonalInfo();
    },
  });

  const { handleSubmit: submitDoctorPersonalInfoForm } = doctorPersonalInfoFormik;

  // cabinet info handlers-------------------------------------------
  const updateDoctorCabinetInfo = (values: DoctorCabinetInfoForm) => {
    setDoctorCabinetInfoForm(values);
  };

  const { mutate: saveCabinetInfoMutation, isLoading: isSaveCabinetInfoLoading } = useMutation(
    updateDoctorCabinetProfile,
  );

  const handleSaveCabinetInfo = () => {
    saveCabinetInfoMutation(doctorCabinetInfoForm);
  };

  const { cabinetForm } = doctorCabinetInfoForm;

  const doctorCabinetInfoFormik: FormikProps<CabinetForm> = useFormik({
    initialValues: cabinetForm,
    enableReinitialize: true,
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
            loading={isSavePersonalInfoLoading}
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
            loading={isSaveCabinetInfoLoading}
          >
            {t('save')}
          </Button>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    getDoctorPersonalInfo();
  }, []);

  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar src="" size={54} />
          </Col>
          <Col flex={1}>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              Dr. {doctorInfo.firstName} {doctorInfo.lastName}
            </Text>
            <br />
            <Text type="secondary" style={{ fontWeight: 500 }}>
              <Row gutter={4}>
                {doctorInfo.specialties.map((specialty) => (
                  <Col>{specialty.name}</Col>
                ))}
              </Row>
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
              handleUpdateData={handleUpdateDoctorPersonalInfo}
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
