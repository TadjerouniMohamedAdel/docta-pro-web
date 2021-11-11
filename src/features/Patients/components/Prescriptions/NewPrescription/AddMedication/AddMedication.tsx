import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon, Label } from '../../../../../../components';
import {
  durationTypes,
  frequencyCounts,
  frequencyPerDays,
  frequencyTimes,
  MedicationItem,
  units,
} from '../../../../../Appointments/types';
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

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = formik;

  const resetMedicationForm = () => {
    resetForm();
  };

  const handleSelectMedication = (name: string) => {
    setFieldValue('name', name);
  };

  const { Option } = Select;

  return (
    <Form className="add-medication-form">
      <Row gutter={[8, 8]} align="middle">
        <Col span={24}>
          <Label
            title={t('add medication')}
            error={touched.name ? errors.name : undefined}
            required
          />
          <Form.Item validateStatus={touched.name && Boolean(errors.name) ? 'error' : undefined}>
            <MedicationAutocomplete
              selectedMedication={values.name}
              onSelectMedication={handleSelectMedication}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Label title={t('units')} />
        </Col>
        <Col span={16}>
          <Label title={t('frequency')} />
        </Col>
        <Col span={8}>
          <Input.Group compact style={{ display: 'flex' }}>
            <Input
              type="number"
              style={{ width: 55 }}
              value={values.unitCount}
              name="unitCount"
              onChange={handleChange}
              onBlur={handleBlur}
              min={1}
            />
            <Select
              value={values.unitType}
              style={{ width: '100%' }}
              onChange={(e) => setFieldValue('unitType', e)}
            >
              {units.map((unit) => (
                <Option value={unit}>{unit}</Option>
              ))}
            </Select>
          </Input.Group>
        </Col>
        <Col span={4}>
          <Select
            value={values.frequencyCount}
            style={{ width: '100%' }}
            onChange={(e) => setFieldValue('frequencyCount', e)}
          >
            {frequencyCounts.map((frequencyCount) => (
              <Option value={frequencyCount}>{frequencyCount}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={values.frequencyPerDay}
            style={{ width: '100%' }}
            onChange={(e) => setFieldValue('frequencyPerDay', e)}
          >
            {frequencyPerDays.map((frequencyPerDay) => (
              <Option value={frequencyPerDay}>{frequencyPerDay}</Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <Select
            value={values.frequencyTime}
            style={{ width: '100%' }}
            onChange={(e) => setFieldValue('frequencyTime', e)}
          >
            {frequencyTimes.map((frequencyTime) => (
              <Option value={frequencyTime}>{frequencyTime}</Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <Label title={t('duration')} />
          <Row justify="space-between" gutter={8}>
            <Col span={8}>
              <Input.Group compact style={{ display: 'flex' }}>
                <Input
                  type="primary"
                  style={{ width: 55 }}
                  value={values.durationCount}
                  name="durationCount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min={1}
                />
                <Select
                  value={values.durationType}
                  style={{ width: '100%' }}
                  onChange={(e) => setFieldValue('durationType', e)}
                >
                  {durationTypes.map((duration) => (
                    <Option value={duration}>{duration}</Option>
                  ))}
                </Select>
              </Input.Group>
            </Col>
            <Col span={12}>
              <Row justify="end">
                <Col span={7}>
                  <Button type="text" danger onClick={resetMedicationForm}>
                    {t('clear')}
                  </Button>
                </Col>
                <Col span={7}>
                  <Button
                    style={{ width: '100%', display: 'flex', alignItems: 'center', columnGap: 12 }}
                    icon={<Icon name="add-circle-fill" />}
                    onClick={() => handleSubmit()}
                  >
                    {t('add')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default AddMedication;
