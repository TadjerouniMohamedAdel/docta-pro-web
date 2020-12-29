import React from 'react';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Input, Avatar, Select as AntSelect } from 'antd';
import { FormikProps } from 'formik';
import Label from '../../../../components/Label/Label';
import Icon from '../../../../components/Icon/Icon';
import Select from '../../../../components/Select/Select';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import { FormField, PersonalInfoForm } from '../../types';
import i18n from '../../../../i18n';

type Props = {
  handleFormChange: (values: FormField) => void;
  formik: FormikProps<PersonalInfoForm>;
};

const PersonalInfo: React.FC<Props> = ({ handleFormChange, formik }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    handleFormChange({ key, value });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={[35, 16]} align="middle">
        <Col>
          <Avatar src="" size={95} />
        </Col>
      </Row>
      <Row gutter={[35, 16]}>
        <Col span={12}>
          <Label
            title="First name"
            error={touched.firstName ? (errors.firstName as string) : undefined}
            required
          />
          <Form.Item
            validateStatus={touched.firstName && Boolean(errors.firstName) ? 'error' : undefined}
          >
            <Input
              prefix={<Icon name="user-line" />}
              name="firstName"
              value={values.firstName}
              placeholder="enter your first name"
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
            title="Last name"
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
              placeholder="enter your last name"
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
            title="Phone"
            error={touched.phone ? (errors.phone as string) : undefined}
            required
          />
          <Form.Item validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}>
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
                handleFieldsChange(e.target.name, e.target.value);
              }}
              dir="ltr"
            >
              {(inputProps: any) => (
                <Input
                  prefix={<Icon name="phone-line" />}
                  name="phone"
                  value={values.phone}
                  placeholder="enter your phone number"
                  {...inputProps}
                />
              )}
            </InputMask>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title="Email" error={touched.email ? (errors.email as string) : undefined} />
          <Form.Item validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}>
            <Input
              prefix={<Icon name="mail-line" />}
              name="email"
              value={values.email}
              placeholder="enter your email"
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
            title="Birthday"
            error={touched.birthday ? (errors.birthday as string) : undefined}
          />
          <Form.Item
            validateStatus={touched.birthday && Boolean(errors.birthday) ? 'error' : undefined}
          >
            <DatePicker
              prefixIcon={<Icon name="mail-line" />}
              name="birthday"
              value={values.birthday}
              placeholder="enter your birthday"
              onChange={(date) => {
                handleChange({
                  target: { name: 'birthday', value: date },
                });
                handleFieldsChange('birthday', date);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title="Gender" error={touched.gender ? (errors.gender as string) : undefined} />
          <Form.Item
            validateStatus={touched.gender && Boolean(errors.gender) ? 'error' : undefined}
          >
            <Select
              prefixIcon={<Icon name="genderless-line" />}
              placeholder="Select your gender"
              dropdownMatchSelectWidth={false}
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

        <Col span={12}>
          <Label title="State" error={touched.state ? (errors.state as string) : undefined} />
          <Form.Item validateStatus={touched.state && Boolean(errors.state) ? 'error' : undefined}>
            <Select
              prefixIcon={<Icon name="map-pin-line" />}
              placeholder="Select your state"
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'state', value },
                });
                handleFieldsChange('state', value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title="City" error={touched.city ? (errors.city as string) : undefined} />
          <Form.Item validateStatus={touched.city && Boolean(errors.city) ? 'error' : undefined}>
            <Select
              prefixIcon={<Icon name="road-map-line" />}
              placeholder="Select your City"
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'city', value },
                });
                handleFieldsChange('city', value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Label
            title="General Status"
            error={touched.generalStatus ? (errors.generalStatus as string) : undefined}
          />
          <Form.Item
            validateStatus={
              touched.generalStatus && Boolean(errors.generalStatus) ? 'error' : undefined
            }
          >
            <Input
              prefix={<Icon name="heart-pulse-line" />}
              name="generalStatus"
              value={values.generalStatus}
              placeholder="enter your general status"
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
  );
};

export default PersonalInfo;
