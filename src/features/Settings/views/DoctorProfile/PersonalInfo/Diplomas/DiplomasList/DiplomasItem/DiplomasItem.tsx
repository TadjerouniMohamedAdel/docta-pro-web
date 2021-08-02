import { Col, Form, Input, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Icon, DatePicker } from '../../../../../../../../components';
import { Diploma } from '../../../../types';
import i18n from '../../../../../../../../i18n';
import './styles.less';

type Props = {
  diploma: Diploma;
  handleUpdateDiploma: (diploma: Diploma) => void;
  handleDeleteDiploma: (id: string) => void;
};

const DiplomasItem: React.FC<Props> = ({ diploma, handleUpdateDiploma, handleDeleteDiploma }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('errors:required field')),
    institute: Yup.string().required(t('errors:required field')),
    graduationDate: Yup.date().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues: diploma,
    validationSchema,
    onSubmit: (values) => {
      handleUpdateDiploma(values);
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
                className="btn-delete-diploma"
                type="text"
                style={{ paddingRight: 0, paddingLeft: 0 }}
                onClick={() => handleDeleteDiploma(diploma.id)}
              >
                <Icon name="delete-bin-7-line" size={20} />
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
                  prefix={<Icon name="government-line" />}
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
