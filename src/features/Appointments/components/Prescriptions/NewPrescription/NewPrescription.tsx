import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Row, FormInstance, Col } from 'antd';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { Icon, Label, Text, Button } from '../../../../../components';
import { MedicationRow, PrescriptionForm } from '../../../types';
import AddMedication from '../AddMedication/AddMedication';
import MedicationsList from '../MedicationsList/MedicationsList';
import PrescriptionNotes from '../PrescriptionNotes/PrescriptionNotes';
import { addPrescription } from '../../../services';
import { useGetDoctorPersonalInfo } from '../../../hooks/useGetDoctorPersonalInfo';
import { useGetDoctorCabinetInfo } from '../../../hooks/useGetDoctorCabinetInfo';
import { useGetPatientInfo } from '../../../hooks/useGetPatientInfo';
import PrescriptionPreview from '../PrescriptionPreview/PrescriptionPreview';

type Props = {
  patientId: string;
  appointmentId: string;
  form: FormInstance<any>;
  backToPrescriptions: () => void;
  initialValues: PrescriptionForm;
};

const NewPrescription: React.FC<Props> = ({
  form,
  patientId,
  appointmentId,
  backToPrescriptions,
  initialValues,
}) => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);
  const { doctorPersonalInfo, isLoading: doctorPersonalLoading } = useGetDoctorPersonalInfo();
  const { doctorCabinetInfo, isLoading: cabinetLoading } = useGetDoctorCabinetInfo();
  const { patientInfo, isLoading: patientLoading } = useGetPatientInfo(patientId);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [printPreview, setPrintPreview] = React.useState(false);
  const validationSchema = Yup.object().shape({
    diagnostic: Yup.string().required(t('errors:required field')),
  });

  const { mutateAsync: addNewPrescriptionMutate } = useMutation((values: PrescriptionForm) =>
    addPrescription(patientId, { ...values, appointment: appointmentId }),
  );

  const queryClient = useQueryClient();
  const handleAddNewPrescription = async (values: PrescriptionForm) => {
    try {
      await addNewPrescriptionMutate(values);
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

  const addMedication = (medication: MedicationRow) => {
    const newMedications = [...values.medications];
    newMedications.push(medication);
    setFieldValue('medications', newMedications);
  };

  const deleteMedication = (id: string) => {
    const newMedications = values.medications.filter((medication) => medication.id !== id);
    setFieldValue('medications', newMedications);
  };

  return (
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
      {!patientLoading && !doctorPersonalLoading && !cabinetLoading && (
        <PrescriptionPreview
          prescription={{
            data: {
              ...formik.values,
              createdAt: new Date(),
              patient: patientInfo?.data,
              doctor: {
                ...doctorPersonalInfo?.data,
                establishment: { ...doctorCabinetInfo?.data },
              },
            },
          }}
          isLoading={patientLoading || doctorPersonalLoading || cabinetLoading}
          onClose={() => {
            setPreviewVisible(false);
            setPrintPreview(false);
          }}
          visible={previewVisible}
          isModal={false}
          printPreview={printPreview}
        />
      )}
      <MedicationsList medications={values.medications} deleteMedication={deleteMedication} />
      <PrescriptionNotes note={values.note} setNote={(note) => setFieldValue('note', note)} />
    </Form>
  );
};

export default NewPrescription;
