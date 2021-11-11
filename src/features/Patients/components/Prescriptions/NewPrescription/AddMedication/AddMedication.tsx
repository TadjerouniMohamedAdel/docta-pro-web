import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Label } from '../../../../../../components';
import { MedicationItem } from '../../../../../Appointments/types';
import MedicationAutocomplete from '../MedicationAutocomplete/MedicationAutocomplete';

type Props = {};

const AddMedication: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const initialValues: MedicationItem = {
    name: '',
    unitCount: 1,
    unitType: 'Applications',
    frequencyCount: 'Une fois',
    frequencyPerDay: 'Par jour',
    frequencyTime: 'Avant repas',
    durationCount: 15,
    durationType: 'Jours',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('errors:required field')),
    unitCount: Yup.string().required(t('errors:required field')),
    unitType: Yup.string().required(t('errors:required field')),
    frequencyCount: Yup.string().required(t('errors:required field')),
    frequencyPerDay: Yup.string().required(t('errors:required field')),
    frequencyTime: Yup.string().required(t('errors:required field')),
    durationCount: Yup.string().required(t('errors:required field')),
    durationType: Yup.string().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: () => {},
  });

  // const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;
  const { touched, errors, setFieldValue } = formik;

  const handleSelectMedication = (name: string) => {
    setFieldValue('name', name);
  };

  return (
    <Form className="add-medication-form">
      <Row gutter={[35, 16]} align="middle">
        <Col span={24}>
          <Label
            title={t('add medication')}
            error={touched.name ? (errors.name as string) : undefined}
            required
          />
          <Form.Item validateStatus={touched.name && Boolean(errors.name) ? 'error' : undefined}>
            <MedicationAutocomplete onSelectMedication={handleSelectMedication} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddMedication;
