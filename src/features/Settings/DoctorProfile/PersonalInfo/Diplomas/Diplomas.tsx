import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import DatePicker from '../../../../../components/DatePicker/DatePicker';
import { Diploma } from '../../types';
import i18n from '../../../../../i18n';
import DiplomasList from './DiplomasList/DiplomasList';

type Props = {
  diplomas: Diploma[];
  updateDiplomas: (values: Diploma[]) => void;
};

const Diplomas: React.FC<Props> = ({ diplomas, updateDiplomas }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const initialValues: Diploma = {
    id: '',
    name: '',
    institute: '',
    graduationDate: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('errors:required field')),
    institute: Yup.string().required(t('errors:required field')),
    graduationDate: Yup.date().required(t('errors:required field')),
  });

  const handleAddDiploma = (diploma: Diploma) => {
    const updatedDiplomas = [...diplomas];
    const id = uuidv4();
    updatedDiplomas.push({ ...diploma, id, isNew: true });
    updateDiplomas(updatedDiplomas);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleAddDiploma(values);
      resetForm();
    },
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Row>
          <Col span={24}>
            <Row justify="space-between" align="bottom">
              <Col>
                <Label title={t('diplomas / certificats')} />
              </Col>
              <Col>
                <Button
                  type="link"
                  style={{ paddingRight: 0, paddingLeft: 0 }}
                  onClick={() => handleSubmit()}
                >
                  <Icon name="add-line" />
                </Button>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  validateStatus={touched.name && Boolean(errors.name) ? 'error' : undefined}
                >
                  <Input
                    prefix={<Icon name="file-list-3-line" />}
                    name="name"
                    value={values.name}
                    placeholder={i18n.t('placeholders:enter', {
                      fieldName: t('diploma title'),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={18}>
                <Form.Item
                  validateStatus={
                    touched.institute && Boolean(errors.institute) ? 'error' : undefined
                  }
                >
                  <Input
                    prefix={<Icon name="government-line" />}
                    name="institute"
                    value={values.institute}
                    placeholder={i18n.t('placeholders:enter', {
                      fieldName: t('institute'),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  validateStatus={
                    touched.graduationDate && Boolean(errors.graduationDate) ? 'error' : undefined
                  }
                >
                  <DatePicker
                    format="MMMM YYYY"
                    picker="month"
                    prefixIcon={<Icon name="calendar-2-line" />}
                    name="graduationDate"
                    value={values.graduationDate ? moment(values.graduationDate) : null}
                    placeholder={i18n.t('placeholders:enter', {
                      fieldName: t('date'),
                    })}
                    onChange={(date) => {
                      handleChange({
                        target: { name: 'graduationDate', value: date },
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <DiplomasList diplomas={diplomas} updateDiplomas={updateDiplomas} />
    </>
  );
};

export default Diplomas;
