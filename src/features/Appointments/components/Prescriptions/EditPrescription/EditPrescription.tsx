import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, FormInstance, Col, Spin } from 'antd';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Icon, Label } from '../../../../../components';
import { MedicationItem, PrescriptionForm } from '../../../types';
import AddMedication from '../AddMedication/AddMedication';
import MedicationsList from '../MedicationsList/MedicationsList';
import PrescriptionNotes from '../PrescriptionNotes/PrescriptionNotes';
import { fetchPrescriptionDetails, updatePrescription } from '../../../services';

const initialData: PrescriptionForm = {
  note: '',
  diagnostic: '',
  medications: [],
};

const useFetchPrescription = (patientId: string, prescriptionId: string): any => {
  const { data: resolvedData, isLoading } = useQuery(
    ['prescription-details', patientId, prescriptionId],
    () => fetchPrescriptionDetails(patientId, prescriptionId),
    { keepPreviousData: true },
  );

  const { data: prescription } = resolvedData || { data: initialData };

  return { prescription, isLoading };
};

type Props = {
  form: FormInstance<any>;
  patientId: string;
  prescriptionId: string;
  backToPrescriptions: () => void;
};

const EditPrescription: React.FC<Props> = ({
  form,
  patientId,
  prescriptionId,
  backToPrescriptions,
}) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);

  const { prescription, isLoading: isFetchingPrescription } = useFetchPrescription(
    patientId,
    prescriptionId,
  );

  const validationSchema = Yup.object().shape({
    diagnostic: Yup.string().required(t('errors:required field')),
  });

  const { mutateAsync: editPrescriptionMutate } = useMutation((variables: PrescriptionForm) =>
    updatePrescription(patientId, prescriptionId, variables),
  );

  const queryClient = useQueryClient();
  const handleEditPrescription = async (values: PrescriptionForm) => {
    try {
      await editPrescriptionMutate(values);
      queryClient.invalidateQueries('prescriptions-history');
      backToPrescriptions();
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: prescription,
    validationSchema,
    enableReinitialize: true,
    onSubmit: handleEditPrescription,
  });

  const { values, touched, errors, handleChange, handleBlur, setFieldValue, handleSubmit } = formik;

  const addMedication = (medication: MedicationItem) => {
    const newMedications = [...values.medications];
    newMedications.push(medication);
    setFieldValue('medications', newMedications);
  };

  const deleteMedication = (id: string) => {
    const updatedMedications = [...values.medications];
    const index = updatedMedications.findIndex((medication) => medication.id === id);

    if (index > -1) {
      if (updatedMedications[index].isNew) updatedMedications.splice(index, 1);
      else updatedMedications[index].isDeleted = true;
      setFieldValue('medications', updatedMedications);
    }
  };

  return (
    <Spin spinning={isFetchingPrescription}>
      <Form form={form} className="prescription-form" onFinish={handleSubmit}>
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
    </Spin>
  );
};

export default EditPrescription;
