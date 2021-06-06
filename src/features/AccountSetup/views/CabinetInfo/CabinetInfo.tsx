import { Col, Form, Row } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { PhoneInput, Spacer } from '../../../../components';
import Images from '../../../Settings/views/DoctorProfile/CabinetInfo/Images/Images';
import Services from '../../../Settings/views/DoctorProfile/CabinetInfo/Services/Services';
import { fetchDoctorCabinetProfile } from '../../../Settings/views/DoctorProfile/services';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { updateCabinetProfile } from '../../services';

type Props = {};

const CabinetInfo: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'placeholders', 'errors']);
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();
  const [loading, setLoading] = useState(false);
  const [doctorCabinetInfoForm, setDoctorCabinetInfoForm] = useState<any>({
    services: [],
    images: [],
    files: [],
    cabinetForm: {
      contactNumber: '',
      secondaryContactNumber: '',
    },
  });

  const handleFieldsChange = (key: string, value: any): void => {
    setDoctorCabinetInfoForm({ ...doctorCabinetInfoForm, [key]: value });
  };

  const { mutateAsync: saveCabinetInfoMutation } = useMutation(updateCabinetProfile);

  const { cabinetForm } = doctorCabinetInfoForm;

  const formik = useFormik({
    initialValues: cabinetForm,
    enableReinitialize: true,
    onSubmit: async () => {
      setLoading(true);
      await saveCabinetInfoMutation(doctorCabinetInfoForm);
      await takeNextStep();
      setLoading(false);
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } = formik;

  const getDoctorCabinetInfo = async () => {
    try {
      const { data } = await fetchDoctorCabinetProfile();
      if (data) {
        setDoctorCabinetInfoForm({
          services: data.services,
          files: [],
          images: data.images || [],
          cabinetForm: {
            contactNumber: data.contactNumber,
            secondaryContactNumber: data.secondaryContactNumber,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorCabinetInfo();
  }, []);

  return currentStep === 2 ? (
    <SetupLayout
      title={t('Help patients find your cabinet')}
      description="Enter your cabinet info to help your patients contact you and know the services your cabinet provides."
      onNext={handleSubmit}
      loading={loading}
      header={t('cabinet info')}
      content={
        <div style={{ padding: '0 80px' }}>
          <Spacer direction="vertical" size="xxl">
            <Services
              services={doctorCabinetInfoForm.services}
              updateServices={(value) => handleFieldsChange('services', value)}
            />
            <Form>
              <Row gutter={[35, 16]}>
                <Col span={12}>
                  <PhoneInput
                    required
                    value={values.contactNumber}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                    name="contactNumber"
                    label={t('Cabinet Phone')}
                    error={touched.contactNumber ? (errors.contactNumber as string) : undefined}
                    placeholder={t('placeholders:enter', {
                      fieldName: t('Cabinet Phone'),
                    })}
                  />
                </Col>
                <Col span={12}>
                  <PhoneInput
                    required
                    value={values.secondaryContactNumber}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                    name="secondaryContactNumber"
                    label={`${t('Cabinet Phone')} 2`}
                    error={
                      touched.secondaryContactNumber
                        ? (errors.secondaryContactNumber as string)
                        : undefined
                    }
                    placeholder={t('placeholders:enter', {
                      fieldName: t('Cabinet Phone'),
                    })}
                  />
                </Col>
              </Row>
            </Form>
            <Images
              images={doctorCabinetInfoForm.images}
              updateImages={(value) => handleFieldsChange('images', value)}
              data={doctorCabinetInfoForm}
              updateData={(value) => setDoctorCabinetInfoForm(value)}
            />
          </Spacer>
        </div>
      }
    />
  ) : null;
};

export default CabinetInfo;
