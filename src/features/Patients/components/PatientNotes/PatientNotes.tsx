import { Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Button, Icon } from '../../../../components';
// import { useGetPatientNotes } from '../../hooks/useGetPatientNotes';
import PatientNotesList from './PatientNotesList/PatientNotesList';
import { PatientNote } from '../../types';
import './styles.less';
import { addPatientNote } from '../../services';

type Props = {
  patientId?: string;
};

const PatientNotes: React.FC<Props> = ({ patientId }) => {
  const { t } = useTranslation();
  // const { data } = useGetPatientNotes(patientId ?? '');

  const initialValues: PatientNote = { title: '', body: '' };
  const { mutateAsync } = useMutation(addPatientNote);

  const onAddNote = (value: PatientNote) => {
    if (patientId)
      mutateAsync({
        patientId,
        data: value,
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onAddNote,
    isInitialValid: false,
  });

  const { handleChange, handleBlur, values, handleSubmit, isValid } = formik;

  return (
    <div style={{ padding: '30px 40px' }}>
      <Form>
        <div className="notes-input-form">
          <Row align="bottom">
            <Col flex={1}>
              <div>
                <div>
                  <Input
                    autoComplete="off"
                    placeholder={t('note title')}
                    className="notes-input"
                    size="small"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="title"
                  />
                </div>
                <div>
                  <Input.TextArea
                    autoComplete="off"
                    placeholder={t('Write note here')}
                    className="notes-input"
                    autoSize={{ minRows: 1 }}
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="body"
                  />
                </div>
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <Button type="text" style={{ display: 'flex' }} size="small">
                    <Icon name="attachment-2" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<Icon name="add-line" />}
                    style={{ display: 'flex' }}
                    size="small"
                    onClick={() => handleSubmit()}
                    disabled={!isValid}
                  >
                    {t('add note')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
      <PatientNotesList />
    </div>
  );
};

export default PatientNotes;
