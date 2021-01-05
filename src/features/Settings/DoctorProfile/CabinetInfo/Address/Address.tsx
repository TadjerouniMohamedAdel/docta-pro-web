import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import i18n from '../../../../../i18n';
import Select from '../../../../../components/Select/Select';
import { AddressForm } from '../../types';

type Props = {
  addressForm: AddressForm;
};

const Address: React.FC<Props> = ({ addressForm }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const formik = useFormik({
    initialValues: addressForm,
    onSubmit: () => {},
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Row gutter={[35, 16]}>
        <Col span={24}>
          <Label
            title={t('address')}
            error={touched.address ? (errors.address as string) : undefined}
          />
          <Form.Item
            validateStatus={touched.address && Boolean(errors.address) ? 'error' : undefined}
          >
            <Input
              prefix={<Icon name="map-pin-line" />}
              name="address"
              value={values.address}
              placeholder={i18n.t('placeholders:enter', {
                fieldName: t('address'),
              })}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Label title={t('state')} error={touched.state ? (errors.state as string) : undefined} />
          <Form.Item validateStatus={touched.state && Boolean(errors.state) ? 'error' : undefined}>
            <Select
              prefixIcon={<Icon name="road-map-line" />}
              placeholder={i18n.t('placeholders:select', {
                fieldName: t('state'),
              })}
              value={values.state}
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'state', value },
                });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title={t('city')} error={touched.city ? (errors.city as string) : undefined} />
          <Form.Item validateStatus={touched.city && Boolean(errors.city) ? 'error' : undefined}>
            <Select
              prefixIcon={<Icon name="map-pin-line" />}
              placeholder={i18n.t('placeholders:select', {
                fieldName: t('city'),
              })}
              value={values.city}
              dropdownMatchSelectWidth={false}
              onChange={(value) => {
                handleChange({
                  target: { name: 'city', value },
                });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default Address;
