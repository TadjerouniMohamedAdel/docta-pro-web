import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, FormInstance, Col, Spin } from 'antd';
import { useFormik } from 'formik';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Icon, Label, Text, Button } from '../../../../../components';
import { MedicationRow, PrescriptionForm } from '../../../types';
import AddMedication from '../AddMedication/AddMedication';
import MedicationsList from '../MedicationsList/MedicationsList';
import PrescriptionNotes from '../PrescriptionNotes/PrescriptionNotes';
import { fetchPrescriptionDetails, updatePrescription } from '../../../services';
import PrescriptionPreview from '../PrescriptionPreview/PrescriptionPreview';

const initialData: PrescriptionForm = {
  note: '',
  diagnostic: '',
  medications: [],
};

const useFetchPrescription = (patientId: string, prescriptionId: string): any => {
  const { data: resolvedData, isLoading } = useQuery(
    ['prescription-details', patientId, prescriptionId],
    () => fetchPrescriptionDetails(prescriptionId),
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
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [printPreview, setPrintPreview] = React.useState(false);
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

  const addMedication = (medication: MedicationRow) => {
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
    <>
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
          <div style={{ marginTop: 37, marginBottom: 24, paddingLeft: 40, paddingRight: 40 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Text>{t('prescription')}</Text>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Button
                      type="link"
                      icon={<Icon name="search-eye-line" />}
                      onClick={() => setPreviewVisible(true)}
                    >
                      {t('preview')}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="link"
                      icon={<Icon name="printer-line" />}
                      onClick={() => {
                        setPreviewVisible(false);
                        setPrintPreview(true);
                      }}
                    >
                      {t('print')}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <MedicationsList medications={values.medications} deleteMedication={deleteMedication} />
          <PrescriptionNotes note={values.note} setNote={(note) => setFieldValue('note', note)} />
        </Form>
      </Spin>
      {!isFetchingPrescription && (formik.values as any)?.doctor && (
        <PrescriptionPreview
          prescription={{ data: { ...formik.values } }}
          isLoading={isFetchingPrescription}
          onClose={() => {
            setPreviewVisible(false);
            setPrintPreview(false);
          }}
          visible={previewVisible}
          isModal={false}
          printPreview={printPreview}
        />
      )}
    </>
  );
};

export default EditPrescription;
