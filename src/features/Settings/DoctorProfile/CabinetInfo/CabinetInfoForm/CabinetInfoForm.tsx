import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikProps } from 'formik';
import ReactInputMask from 'react-input-mask';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import i18n from '../../../../../i18n';
import { CabinetForm } from '../../types';

type Props = {
  data: CabinetForm;
  formik: FormikProps<CabinetForm>;
  handleUpdateData: (values: CabinetForm) => void;
};

const CabinetInfoForm: React.FC<Props> = ({ data, formik, handleUpdateData }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const { handleChange, handleBlur, values, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    handleUpdateData({ ...data, [key]: value });
  };

  return (
    <Form>
      <Row gutter={[35, 16]}>
        <Col span={12}>
          <Label
            title={t('Cabinet Phone')}
            error={touched.contactNumber ? (errors.contactNumber as string) : undefined}
            required
          />
          <Form.Item
            validateStatus={
              touched.contactNumber && Boolean(errors.contactNumber) ? 'error' : undefined
            }
          >
            <ReactInputMask
              mask="+213 999 999 999"
              maskChar={null}
              placeholder={i18n.t('placeholders:enter', {
                fieldName: t('Cabinet Phone'),
              })}
              value={values.contactNumber}
              onChange={(e) =>
                handleChange({
                  target: { name: 'contactNumber', value: e.target.value.replace(/ /g, '') },
                })
              }
              onBlur={(e) => {
                handleBlur({
                  target: { name: 'contactNumber', value: e.target.value.replace(/ /g, '') },
                });

                handleFieldsChange('contactNumber', e.target.value.replace(/ /g, ''));
              }}
            >
              {(inputProps: any) => (
                <Input
                  prefix={<Icon name="phone-line" />}
                  name="contactNumber"
                  value={values.contactNumber}
                  {...inputProps}
                />
              )}
            </ReactInputMask>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label
            title={`${t('Cabinet Phone')} 2`}
            error={
              touched.secondaryContactNumber ? (errors.secondaryContactNumber as string) : undefined
            }
            required
          />
          <Form.Item
            validateStatus={
              touched.secondaryContactNumber && Boolean(errors.secondaryContactNumber)
                ? 'error'
                : undefined
            }
          >
            <ReactInputMask
              mask="+213 999 999 999"
              maskChar={null}
              placeholder={i18n.t('placeholders:enter', {
                fieldName: t('Cabinet Phone'),
              })}
              value={values.secondaryContactNumber}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'secondaryContactNumber',
                    value: e.target.value.replace(/ /g, ''),
                  },
                })
              }
              onBlur={(e) => {
                handleBlur({
                  target: {
                    name: 'secondaryContactNumber',
                    value: e.target.value.replace(/ /g, ''),
                  },
                });

                handleFieldsChange('secondaryContactNumber', e.target.value.replace(/ /g, ''));
              }}
            >
              {(inputProps: any) => (
                <Input
                  prefix={<Icon name="phone-line" />}
                  name="secondaryContactNumber"
                  value={values.secondaryContactNumber}
                  {...inputProps}
                />
              )}
            </ReactInputMask>
          </Form.Item>
        </Col>
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
              placeholder={t('address')}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title={t('state')} error={touched.state ? (errors.state as string) : undefined} />
          <Form.Item validateStatus={touched.state && Boolean(errors.state) ? 'error' : undefined}>
            <Input
              prefix={<Icon name="road-map-line" />}
              name="state"
              value={values.state}
              placeholder={t('state')}
              disabled
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Label title={t('city')} error={touched.city ? (errors.city as string) : undefined} />
          <Form.Item validateStatus={touched.city && Boolean(errors.city) ? 'error' : undefined}>
            <Input
              prefix={<Icon name="map-pin-line" />}
              name="city"
              value={values.city}
              placeholder={t('city')}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CabinetInfoForm;
