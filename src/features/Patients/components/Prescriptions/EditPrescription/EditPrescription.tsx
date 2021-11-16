import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, FormInstance, Col } from 'antd';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Icon, Label } from '../../../../../components';
import { MedicationItem, PrescriptionForm } from '../../../../Appointments/types';
import AddMedication from '../AddMedication/AddMedication';
import MedicationsList from '../MedicationsList/MedicationsList';
import PrescriptionNotes from '../PrescriptionNotes/PrescriptionNotes';
import { addPrescription } from '../../../../Appointments/services';

type Props = {
  patientId: string;
  appointmentId: string;
  form: FormInstance<any>;
  backToPrescriptions: () => void;
};

const EditPrescription: React.FC<Props> = ({
  form,
  patientId,
  appointmentId,
  backToPrescriptions,
}) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const initialValues: PrescriptionForm = {
    note: '',
    diagnostic: '',
    medications: [],
  };

  const validationSchema = Yup.object().shape({
    diagnostic: Yup.string().required(t('errors:required field')),
  });

  const { mutateAsync: addNewPrescriptionMutate } = useMutation(addPrescription);

  const queryClient = useQueryClient();
  const handleAddNewPrescription = async (values: PrescriptionForm) => {
    try {
      await addNewPrescriptionMutate({
        patientId,
        appointment: appointmentId,
        ...values,
      });
      queryClient.invalidateQueries('prescriptions-history');
      backToPrescriptions();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleAddNewPrescription,
  });

  const { values, touched, errors, handleChange, handleBlur, setFieldValue, handleSubmit } = formik;

  const addMedication = (medication: MedicationItem) => {
    const newMedications = [...values.medications];
    newMedications.push(medication);
    setFieldValue('medications', newMedications);
  };

  const deleteMedication = (id: string) => {
    const newMedications = values.medications.filter((medication) => medication.id !== id);
    setFieldValue('medications', newMedications);
  };

  return (
    <Form form={form} className="new-prescription" onFinish={handleSubmit}>
      <div style={{ padding: '24px 40px 0' }}>
        <Row gutter={[35, 16]} align="middle">
          <Col span={24}>
            <Label
              title={t('diagnostic')}
              error={touched.diagnostic ? (errors.diagnostic as string) : undefined}
              required
            />
            <Form.Item
              validateStatus={
                touched.diagnostic && Boolean(errors.diagnostic) ? 'error' : undefined
              }
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
            <AddMedication addMedication={addMedication} />
          </Col>
        </Row>
      </div>
      <MedicationsList medications={values.medications} deleteMedication={deleteMedication} />
      <PrescriptionNotes note={values.note} setNote={(note) => setFieldValue('note', note)} />
    </Form>
  );
};

export default EditPrescription;
