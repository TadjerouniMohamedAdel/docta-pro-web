import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Button, Col, Form, Input, Row, Select as AntSelect, Upload } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useMutation } from 'react-query';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import { fetchDoctorPersonalInfo } from '../../../Settings/views/DoctorProfile/services';
import { getBase64 } from '../../../../common/utilities';
import { DatePicker, Icon, Label, Select, Text } from '../../../../components';
import { updateDoctorProfilePart1 } from '../../services';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';

type Props = {};

const DoctorProfile1: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();

  const [doctorPersonalInfoForm, setDoctorPersonalInfoForm] = useState<any>({
    picture: '',
    firstName: '',
    firstNameAr: '',
    lastName: '',
    lastNameAr: '',
    email: '',
    birthDate: '',
    gender: undefined,
  });

  const {
    mutateAsync: savePersonalInfoMutation,
    isLoading: isSavePersonalInfoLoading,
  } = useMutation(updateDoctorProfilePart1);

  const formik = useFormik({
    initialValues: doctorPersonalInfoForm,
    enableReinitialize: true,
    onSubmit: async () => {
      await savePersonalInfoMutation(doctorPersonalInfoForm);
      takeNextStep();
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    setDoctorPersonalInfoForm({ ...doctorPersonalInfoForm, [key]: value });
  };

  const handleUploadImage = async (file: Blob) => {
    try {
      const result = await getBase64(file);
      setDoctorPersonalInfoForm({ ...doctorPersonalInfoForm, picture: result as string, file });
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorPersonalInfo = async () => {
    try {
      const { data } = await fetchDoctorPersonalInfo();
      if (data) {
        setDoctorPersonalInfoForm({
          picture: data.picture || '',
          firstName: data.firstName,
          firstNameAr: data.firstNameAr,
          lastName: data.lastName,
          lastNameAr: data.lastNameAr,
          email: data.email,
          phone: data.phone,
          birthDate: data.birthDate,
          gender: data.gender,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorPersonalInfo();
  }, []);

  return currentStep === 0 ? (
    <SetupLayout
      title={t('Welcome to Docta Pro !')}
      description=" We're excited to have you join our platform ! You are just a few steps away from going
  live, all you need to do is to complete your profile."
      onNext={handleSubmit}
      loading={isSavePersonalInfoLoading}
      content={
        <div>
          <div style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{t('doctor profile')}</Text>
          </div>
          <Form>
            <Row gutter={[35, 32]} align="middle">
              <Col span={24}>
                <Row gutter={35} align="middle">
                  <Col>
                    {doctorPersonalInfoForm.picture ? (
                      <Avatar src={doctorPersonalInfoForm.picture} size={95} />
                    ) : (
                      <Avatar src={doctorPersonalInfoForm.picture} size={95}>
                        {doctorPersonalInfoForm.firstName[0]?.toUpperCase()}
                        {doctorPersonalInfoForm.lastName[0]?.toUpperCase()}
                      </Avatar>
                    )}
                  </Col>
                  <Col>
                    <Upload
                      accept="image/*"
                      showUploadList={false}
                      beforeUpload={(file) => {
                        handleUploadImage(file);
                        return false;
                      }}
                    >
                      <Button
                        type="default"
                        size="small"
                        style={{ paddingLeft: 24, paddingRight: 24 }}
                      >
                        {t('change photo')}
                      </Button>
                    </Upload>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Label
                  title={t('first name')}
                  error={touched.firstName ? (errors.firstName as string) : undefined}
                  required
                />
                <Form.Item
                  validateStatus={
                    touched.firstName && Boolean(errors.firstName) ? 'error' : undefined
                  }
                >
                  <Input
                    prefix={<Icon name="user-line" />}
                    name="firstName"
                    value={values.firstName}
                    placeholder={t('placeholders:enter', {
                      fieldName: t('first name'),
                    })}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label
                  dir="rtl"
                  title="الاسم"
                  error={touched.firstNameAr ? (errors.firstNameAr as string) : undefined}
                  required
                />
                <Form.Item
                  validateStatus={
                    touched.firstNameAr && Boolean(errors.firstNameAr) ? 'error' : undefined
                  }
                >
                  <Input
                    dir="rtl"
                    suffix={<Icon name="user-line" />}
                    name="firstNameAr"
                    value={values.firstNameAr}
                    placeholder="أدخل الإسم بالحروف العربية"
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label
                  title={t('last name')}
                  error={touched.lastName ? (errors.lastName as string) : undefined}
                  required
                />
                <Form.Item
                  validateStatus={
                    touched.lastName && Boolean(errors.lastName) ? 'error' : undefined
                  }
                >
                  <Input
                    prefix={<Icon name="user-line" />}
                    name="lastName"
                    value={values.lastName}
                    placeholder={t('placeholders:enter', {
                      fieldName: t('last name'),
                    })}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label
                  dir="rtl"
                  title="اللقب"
                  error={touched.lastNameAr ? (errors.lastNameAr as string) : undefined}
                  required
                />
                <Form.Item
                  validateStatus={
                    touched.lastNameAr && Boolean(errors.lastNameAr) ? 'error' : undefined
                  }
                >
                  <Input
                    dir="rtl"
                    suffix={<Icon name="user-line" />}
                    name="lastNameAr"
                    value={values.lastNameAr}
                    placeholder="أدخل اللقب بالحروف العربية"
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label
                  title={t('birthday')}
                  error={touched.birthDate ? (errors.birthDate as string) : undefined}
                />
                <Form.Item
                  validateStatus={
                    touched.birthDate && Boolean(errors.birthDate) ? 'error' : undefined
                  }
                >
                  <DatePicker
                    prefixIcon={<Icon name="cake-line" />}
                    name="birthDate"
                    value={values.birthDate ? moment(values.birthDate) : null}
                    placeholder={t('placeholders:enter', {
                      fieldName: t('birthday'),
                    })}
                    onChange={(date) => {
                      handleChange({
                        target: { name: 'birthDate', value: date },
                      });
                      handleFieldsChange('birthDate', date);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Label
                  title={t('gender')}
                  error={touched.gender ? (errors.gender as string) : undefined}
                />
                <Form.Item
                  validateStatus={touched.gender && Boolean(errors.gender) ? 'error' : undefined}
                >
                  <Select
                    prefixIcon={<Icon name="genderless-line" />}
                    placeholder={t('placeholders:select', {
                      fieldName: t('gender'),
                    })}
                    dropdownMatchSelectWidth={false}
                    value={values.gender}
                    onChange={(value) => {
                      handleChange({
                        target: { name: 'gender', value },
                      });
                      handleFieldsChange('gender', value);
                    }}
                  >
                    <AntSelect.Option value="MALE">{t('male')}</AntSelect.Option>
                    <AntSelect.Option value="Female">{t('female')}</AntSelect.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Label
                  title={t('email')}
                  error={touched.email ? (errors.email as string) : undefined}
                />
                <Form.Item
                  validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
                >
                  <Input
                    prefix={<Icon name="mail-line" />}
                    name="email"
                    value={values.email}
                    placeholder={t('placeholders:enter', {
                      fieldName: t('email'),
                    })}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      }
    />
  ) : null;
};

export default DoctorProfile1;
