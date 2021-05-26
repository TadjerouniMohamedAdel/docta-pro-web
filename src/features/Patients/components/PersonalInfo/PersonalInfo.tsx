import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Input, Select as AntSelect } from 'antd';
import { FormikProps } from 'formik';
import moment from 'moment';
import Label from '../../../../components/Label/Label';
import Icon from '../../../../components/Icon/Icon';
import Select from '../../../../components/Select/Select';
import DatePicker from '../../../../components/DatePicker/DatePicker';
import { FormField, PersonalInfoForm } from '../../types';
import i18n from '../../../../i18n';
import { useGetStatesList } from '../../../../common/hooks/useGetStatesList';
import { StateCity } from '../../../../common/types';
import { useGetCitiesList } from '../../../../common/hooks/useGetCitiesList';
import { useFieldByLocal } from '../../../../common/hooks/useFieldByLocal';
import PhoneInput from '../../../../components/PhoneInput/PhoneInput';

type Props = {
  handleFormChange: (values: FormField) => void;
  formik: FormikProps<PersonalInfoForm>;
};

const PersonalInfo: React.FC<Props> = ({ handleFormChange, formik }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);
  const { getFieldNameByLocal } = useFieldByLocal();

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    handleFormChange({ key, value });
  };

  const { states } = useGetStatesList();
  const { cities } = useGetCitiesList(values.state);

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={[35, 16]} align="middle">
        {/* <Col span={24}>
          {values.picture ? (
            <Avatar src={values.picture} size={95} />
          ) : (
            <Avatar src={values.picture} size={95}>
              {values.firstName[0]?.toUpperCase()}
              {values.lastName[0]?.toUpperCase()}
            </Avatar>
          )}
        </Col> */}
        <Col span={12}>
          <Label
            title={t('first name')}
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
          <PhoneInput
            required
            value={values.phone}
            onChange={handleChange}
            onBlur={(e) => {
              handleBlur(e);
              handleFieldsChange(e.target.name, e.target.value);
            }}
            name="phone"
            label={t('phone number')}
            error={touched.phone ? (errors.phone as string) : undefined}
            placeholder={`+213 ${t('placeholders:enter', {
              fieldName: t('phone number'),
            })}`}
          />
        </Col>
        <Col span={12}>
          <Label title={t('email')} error={touched.email ? (errors.email as string) : undefined} />
          <Form.Item validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}>
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
            validateStatus={touched.birthDate && Boolean(errors.birthDate) ? 'error' : undefined}
          >
            <DatePicker
              prefixIcon={<Icon name="cake-line" />}
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

        <Col span={12}>
          <Label title={t('state')} error={touched.state ? (errors.state as string) : undefined} />
          <Form.Item validateStatus={touched.state && Boolean(errors.state) ? 'error' : undefined}>
            <Select
              showSearch
              prefixIcon={<Icon name="road-map-line" />}
              placeholder={i18n.t('placeholders:select', {
                fieldName: t('state'),
              })}
              value={states?.data ? values.state : undefined}
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'state', value },
                });
                handleChange({
                  target: { name: 'city', value: undefined },
                });
                handleFieldsChange('state', value);
              }}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {states.data
                ? states.data.map((state: StateCity) => (
                    <AntSelect.Option key={state.id} value={state.id}>
                      {(state as any)[getFieldNameByLocal()] ?? state.name}
                    </AntSelect.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title={t('city')} error={touched.city ? (errors.city as string) : undefined} />
          <Form.Item validateStatus={touched.city && Boolean(errors.city) ? 'error' : undefined}>
            <Select
              showSearch
              prefixIcon={<Icon name="map-pin-line" />}
              placeholder={i18n.t('placeholders:select', {
                fieldName: t('city'),
              })}
              value={cities?.data ? values.city : undefined}
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'city', value },
                });
                handleFieldsChange('city', value);
              }}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {cities.data
                ? cities.data.map((city: StateCity) => (
                    <AntSelect.Option key={city.id} value={city.id}>
                      {(city as any)[getFieldNameByLocal()] ?? city.name}
                    </AntSelect.Option>
                  ))
                : null}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Label
            title={t('general status')}
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
              placeholder={i18n.t('placeholders:enter', {
                fieldName: t('general status'),
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
  );
};

export default PersonalInfo;
