import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, FormInstance, Col } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon, Label } from '../../../../../components';
import { PrescriptionForm } from '../../../../Appointments/types';
import AddMedication from './AddMedication/AddMedication';

type Props = {
  form: FormInstance<any>;
};

const NewPrescription: React.FC<Props> = ({ form }) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const initialValues: PrescriptionForm = {
    diagnostic: '',
    medications: [],
  };

  const validationSchema = Yup.object().shape({
    diagnostic: Yup.string().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { values, touched, errors, handleChange, handleBlur } = formik;

  return (
    <Form form={form} style={{ padding: '24px 40px' }}>
      <Row gutter={[35, 16]} align="middle">
        <Col span={24}>
          <Label
            title={t('diagnostic')}
            error={touched.diagnostic ? (errors.diagnostic as string) : undefined}
            required
          />
          <Form.Item
            validateStatus={touched.diagnostic && Boolean(errors.diagnostic) ? 'error' : undefined}
          >
            <Input
              prefix={<Icon name="heart-pulse-line" />}
              name="diagnostic"
              value={values.diagnostic}
              placeholder={t('placeholders:enter', {
                fieldName: t('diagnostic'),
              })}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <AddMedication />
        </Col>
      </Row>
    </Form>
  );
};

export default NewPrescription;
