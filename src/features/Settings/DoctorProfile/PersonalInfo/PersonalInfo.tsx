import React from 'react';
import { Avatar, Button, Col, Form, Input, Row, Select as AntSelect, Upload } from 'antd';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { FormikProps } from 'formik';
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

type Props = {
  data: DoctorPersonalInfoForm;
  formik: FormikProps<DoctorPersonalInfoForm>;
  handleUpdateData: (values: DoctorPersonalInfoForm) => void;
};

const PersonalInfo: React.FC<Props> = ({ data, formik, handleUpdateData }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const { handleChange, handleBlur, values, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    handleUpdateData({ ...data, [key]: value });
  };

  const handleUpdateLanguages = (languages: Language[]) => {
    handleUpdateData({ ...data, languages });
  };

  const handleUpdateDiplomas = (diplomas: Diploma[]) => {
    handleUpdateData({ ...data, diplomas });
  };

  const handleUploadImage = async (file: Blob) => {
    try {
      const result = await getBase64(file);
      handleUpdateData({ ...data, picture: result as string, file });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ padding: '24px 80px' }}>
        <Form>
          <Row gutter={[35, 16]} align="middle">
            <Col>
              <Avatar src={data.picture} size={95} />
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
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFieldsChange(e.target.name, e.target.value);
                  }}
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
                  placeholder={t('phone number')}
                  value={values.phone}
                  disabled
                  onChange={(e) =>
                    handleChange({
                      target: { name: 'phone', value: e.target.value.replace(/ /g, '') },
                    })
                  }
                  onBlur={(e) => {
                    handleBlur({
                      target: { name: 'phone', value: e.target.value.replace(/ /g, '') },
                    });

                    handleFieldsChange('phone', e.target.value.replace(/ /g, ''));
                  }}
                >
                  {(inputProps: any) => (
                    <Input
                      prefix={<Icon name="phone-line" />}
                      name="phone"
                      value={values.phone}
                      disabled
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
                  placeholder={i18n.t('placeholders:select', {
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
                  <AntSelect.Option value="MALE">Male</AntSelect.Option>
                  <AntSelect.Option value="Female">Female</AntSelect.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[35, 16]}>
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
                  onBlur={(e) => {
                    handleBlur(e);
                    handleFieldsChange(e.target.name, e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Diplomas diplomas={data.diplomas} updateDiplomas={handleUpdateDiplomas} />
        <Languages languages={data.languages} updateLanguages={handleUpdateLanguages} />
      </div>
    </>
  );
};

export default PersonalInfo;
