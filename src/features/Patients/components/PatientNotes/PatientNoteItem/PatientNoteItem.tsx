import { Col, Row } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Button, Icon, Text } from '../../../../../components';
import { useRemovePatientNotes } from '../../../hooks/useRemovePatientNote';
import { useUpdatePatientNotes } from '../../../hooks/useUpdatePatientNote';
import { PatientNote } from '../../../types';
import PatientNoteForm from '../PatientNoteForm/PatientNoteForm';

type Props = {
  note: PatientNote;
};

const PatientNoteItem: React.FC<Props> = ({ note }) => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);

  const { mutateAsync: removeNoteMutate } = useRemovePatientNotes();
  const { mutateAsync: updateNoteMutate, isLoading: updateNoteLoading } = useUpdatePatientNotes();

  const onUpdateNote = async (values: PatientNote) => {
    if (note.id) await updateNoteMutate({ noteId: note.id, data: values });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    body: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: note,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await onUpdateNote(values);
      resetForm();
      setEditMode(false);
    },
    isInitialValid: false,
  });

  const handleEditNote = () => {
    setEditMode(true);
    formik.setValues(note);
  };
  const handleDeleteNote = () => {
    removeNoteMutate(note.id);
  };

  return (
    <div>
      {editMode ? (
        <PatientNoteForm
          formik={formik}
          actions={
            <Row gutter={8}>
              <Col>
                <Button
                  type="primary"
                  style={{ display: 'flex' }}
                  size="small"
                  onClick={() => formik.handleSubmit()}
                  disabled={!formik.isValid}
                  loading={updateNoteLoading}
                >
                  {t('save')}
                </Button>
              </Col>
              <Col>
                <Button
                  type="default"
                  style={{ display: 'flex' }}
                  size="small"
                  onClick={() => setEditMode(false)}
                >
                  {t('cancel')}
                </Button>
              </Col>
            </Row>
          }
        />
      ) : (
        <div className="note-item">
          <Row align="top" wrap={false}>
            <Col flex={1}>
              <div>
                <Text size="lg" style={{ fontWeight: 500 }}>
                  {note.title}
                </Text>
              </div>
              <div>
                <Text>{note.body}</Text>
              </div>
            </Col>
            <Col>
              <Row wrap={false} className="note-actions">
                <Col>
                  <Button
                    type="text"
                    size="small"
                    className="edit-action"
                    onClick={() => handleEditNote()}
                  >
                    <Icon name="pencil-line" />
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="text"
                    size="small"
                    className="delete-action"
                    onClick={() => handleDeleteNote()}
                  >
                    <Icon name="delete-bin-7-line" />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default PatientNoteItem;
