import { Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
// import { RcFile } from 'antd/lib/upload';
import { Button, Icon } from '../../../../components';
import { useGetPatientNotes } from '../../hooks/useGetPatientNotes';
import PatientNotesList from './PatientNotesList/PatientNotesList';
import { PatientNote } from '../../types';
import './styles.less';
import { useAddPatientNotes } from '../../hooks/useAddPatientNote';
// import { getBase64 } from '../../../../common/utilities';

type Props = {
  patientId?: string;
};

const PatientNotes: React.FC<Props> = ({ patientId }) => {
  const { t } = useTranslation();
  const { data } = useGetPatientNotes(patientId ?? '');

  const initialValues: PatientNote = { id: '', title: '', body: '', files: [] };
  const { mutateAsync, isLoading } = useAddPatientNotes();

  const onAddNote = async (value: PatientNote) => {
    if (patientId) {
      await mutateAsync({
        patientId,
        data: value,
      });
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    body: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onAddNote(values);
      resetForm();
    },
    isInitialValid: false,
  });

  const { handleChange, handleBlur, values, handleSubmit, isValid } = formik;

  // const handleUploadFile = async (file: RcFile) => {
  //   try {
  //     await getBase64(file);
  //     formik.setFieldValue('files', [...formik.values.files, file]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
                    className="notes-input title"
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
                {/* <div>
                  {values.files.map((file) => (
                    <Tag icon={<Icon size={15} name="file-text-line" />}>{file.name}</Tag>
                  ))}
                </div> */}
              </div>
            </Col>
            <Col>
              <Row>
                {/* <Col>
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleUploadFile(file);
                      return false;
                    }}
                  >
                    <Button type="text" style={{ display: 'flex' }} size="small">
                      <Icon name="attachment-2" />
                    </Button>
                  </Upload>
                </Col> */}
                <Col>
                  <Button
                    type="primary"
                    icon={<Icon name="add-line" />}
                    style={{ display: 'flex' }}
                    size="small"
                    onClick={() => handleSubmit()}
                    disabled={!isValid}
                    loading={isLoading}
                  >
                    {t('add note')}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Form>
      <PatientNotesList notes={data} />
    </div>
  );
};

export default PatientNotes;
