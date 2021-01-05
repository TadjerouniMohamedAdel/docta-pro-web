import React, { useState } from 'react';
import { Avatar, Button, Col, Divider, Form, Input, Row, Select as AntSelect, Upload } from 'antd';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import moment from 'moment';
import Label from '../../../../components/Label/Label';
import Icon from '../../../../components/Icon/Icon';
import Select from '../../../../components/Select/Select';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import i18n from '../../../../i18n';
import { Diploma, DoctorPersonalInfoForm, Language } from '../types';
import Diplomas from './Diplomas/Diplomas';
import Languages from './Languages/Languages';
import { getBase64 } from '../../../../utils/base64';

type Props = {};

const PersonalInfo: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const initialValues: DoctorPersonalInfoForm = {
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
  };

  const [data, setData] = useState(initialValues);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const hanldeUpdateLanguages = (languages: Language[]) => {
    setData({ ...data, languages });
  };

  const handleUpdateDiplomas = (diplomas: Diploma[]) => {
    setData({ ...data, diplomas });
  };

  const handleUploadImage = async (file: Blob) => {
    try {
      const result = await getBase64(file);
      setData({ ...data, picture: result as string });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ padding: '24px 80px' }}>
        <Form onFinish={handleSubmit}>
          <Row gutter={[35, 16]} align="middle">
            <Col>
              <Avatar src={data.picture} size={95} />
            </Col>
            <Col>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => {
                  handleUploadImage(file);
                  return false;
                }}
              >
                <Button type="default" size="small" style={{ paddingLeft: 24, paddingRight: 24 }}>
                  {t('change photo')}
                </Button>
              </Upload>
            </Col>
          </Row>
          <Row gutter={[35, 16]}>
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
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('first name'),
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                validateStatus={touched.lastName && Boolean(errors.lastName) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="user-line" />}
                  name="lastName"
                  value={values.lastName}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('last name'),
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label
                title={t('phone number')}
                error={touched.phone ? (errors.phone as string) : undefined}
                required
              />
              <Form.Item
                validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
              >
                <InputMask
                  mask="+213 999 999 999"
                  maskChar={null}
                  placeholder={`+213 ${i18n.t('placeholders:enter', {
                    fieldName: t('phone number'),
                  })}`}
                  value={values.phone}
                  onChange={(e) =>
                    handleChange({
                      target: { name: 'phone', value: e.target.value.replace(/ /g, '') },
                    })
                  }
                  onBlur={(e) => {
                    handleBlur({
                      target: { name: 'phone', value: e.target.value.replace(/ /g, '') },
                    });
                  }}
                >
                  {(inputProps: any) => (
                    <Input
                      prefix={<Icon name="phone-line" />}
                      name="phone"
                      value={values.phone}
                      {...inputProps}
                    />
                  )}
                </InputMask>
              </Form.Item>
            </Col>
            <Col span={12}>
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
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('email'),
                  })}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  prefixIcon={<Icon name="mail-line" />}
                  name="birthDate"
                  value={values.birthDate ? moment(values.birthDate) : null}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('birthday'),
                  })}
                  onChange={(date) => {
                    handleChange({
                      target: { name: 'birthDate', value: date },
                    });
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
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('gender'),
                  })}
                  dropdownMatchSelectWidth={false}
                  value={values.gender}
                  onChange={(value) => {
                    handleChange({
                      target: { name: 'gender', value },
                    });
                  }}
                >
                  <AntSelect.Option value="MALE">Male</AntSelect.Option>
                  <AntSelect.Option value="Female">Female</AntSelect.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[35, 16]}>
            <Col span={12}>
              <Label
                title={t('main specialty')}
                error={touched.mainSpecialty ? (errors.mainSpecialty as string) : undefined}
              />
              <Form.Item
                validateStatus={
                  touched.mainSpecialty && Boolean(errors.mainSpecialty) ? 'error' : undefined
                }
              >
                <Select
                  prefixIcon={<Icon name="first-aid-kit-line" />}
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('main specialty'),
                  })}
                  dropdownMatchSelectWidth={false}
                  value={values.mainSpecialty}
                  onChange={(value) => {
                    handleChange({
                      target: { name: 'mainSpecialty', value },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Label
                title={t('secondary specialty')}
                error={
                  touched.secondarySpecialty ? (errors.secondarySpecialty as string) : undefined
                }
              />
              <Form.Item
                validateStatus={
                  touched.secondarySpecialty && Boolean(errors.secondarySpecialty)
                    ? 'error'
                    : undefined
                }
              >
                <Select
                  prefixIcon={<Icon name="first-aid-kit-line" />}
                  placeholder={i18n.t('placeholders:select', {
                    fieldName: t('secondary specialty'),
                  })}
                  dropdownMatchSelectWidth={false}
                  value={values.secondarySpecialty}
                  onChange={(value) => {
                    handleChange({
                      target: { name: 'secondarySpecialty', value },
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Label
                title={t('Doctor Biography (max 240 words)')}
                error={touched.biography ? (errors.biography as string) : undefined}
                required
              />
              <Form.Item
                validateStatus={
                  touched.biography && Boolean(errors.biography) ? 'error' : undefined
                }
              >
                <Input.TextArea
                  //   prefix={<Icon name="user-2-line" />}
                  name="biography"
                  maxLength={240}
                  autoSize={{ minRows: 4 }}
                  value={values.biography}
                  placeholder={t('Tell your patients about you')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Divider style={{ margin: 0 }} />
      <div style={{ padding: '24px 80px' }}>
        <Diplomas diplomas={data.diplomas} updateDiplomas={handleUpdateDiplomas} />
        <Languages languages={data.languages} updateLanguages={hanldeUpdateLanguages} />
      </div>
    </>
  );
};

export default PersonalInfo;
