import { Col, Form, Input, Row } from 'antd';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PatientNote } from '../../../types';

type Props = {
  formik: FormikProps<PatientNote>;
  actions: React.ReactNode;
};

const PatientNoteForm: React.FC<Props> = ({ formik, actions }) => {
  const { t } = useTranslation();
  return (
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
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="title"
                  autoFocus
                />
              </div>
              <div>
                <Input.TextArea
                  autoComplete="off"
                  placeholder={t('Write note here')}
                  className="notes-input"
                  autoSize={{ minRows: 1 }}
                  value={formik.values.body}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              <Col>{actions}</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default PatientNoteForm;
