import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../../../components/Button/Button';
import Icon from '../../../../../../../components/Icon/Icon';
import DatePicker from '../../../../../../../components/DatePicker/DatePicker';
import { Diploma } from '../../../../types';
import i18n from '../../../../../../../i18n';

type Props = {
  index: number;
  diploma: Diploma;
  handleUpdateDiploma: (index: number, diploma: Diploma) => void;
  handleDeleteDiploma: (index: number) => void;
};

const DiplomasItem: React.FC<Props> = ({
  index,
  diploma,
  handleUpdateDiploma,
  handleDeleteDiploma,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(t('errors:required field')),
    institute: Yup.string().required(t('errors:required field')),
    date: Yup.date().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues: diploma,
    validationSchema,
    onSubmit: (values) => {
      handleUpdateDiploma(index, values);
    },
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Row>
        <Col span={24}>
          <Row justify="end" align="bottom">
            <Col>
              <Button
                type="text"
                style={{ paddingRight: 0, paddingLeft: 0 }}
                onClick={() => handleDeleteDiploma(index)}
              >
                <Icon name="delete-bin-7-line" />
              </Button>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Form.Item
                validateStatus={touched.title && Boolean(errors.title) ? 'error' : undefined}
              >
                <Input
                  prefix={<Icon name="file-text-line" />}
                  name="title"
                  value={values.title}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('diploma title'),
                  })}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleSubmit();
                  }}
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
                  prefix={<Icon name="user-line" />}
                  name="institute"
                  value={values.institute}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('institute'),
                  })}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleSubmit();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                validateStatus={touched.date && Boolean(errors.date) ? 'error' : undefined}
              >
                <DatePicker
                  format="MMMM YYYY"
                  picker="month"
                  prefixIcon={<Icon name="calendar-2-line" />}
                  name="date"
                  value={values.date ? moment(values.date) : null}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('date'),
                  })}
                  onChange={(date) => {
                    handleChange({
                      target: { name: 'date', value: date },
                    });
                    handleSubmit();
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default DiplomasItem;
