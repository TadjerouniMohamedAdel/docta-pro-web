import { Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Label, Text } from '../../../../components';
import Diplomas from '../../../Settings/views/DoctorProfile/PersonalInfo/Diplomas/Diplomas';
import Languages from '../../../Settings/views/DoctorProfile/PersonalInfo/Languages/Languages';
import { fetchDoctorPersonalInfo } from '../../../Settings/views/DoctorProfile/services';
import SetupLayout from '../../components/SetupLayout/SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { updateDoctorProfilePart2 } from '../../services';

type Props = {};

const DoctorProfile2: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();

  const [doctorPersonalInfoForm, setDoctorPersonalInfoForm] = useState<any>({
    biography: '',
    diplomas: [],
    languages: [],
  });

  const {
    mutateAsync: savePersonalInfoMutation,
    isLoading: isSavePersonalInfoLoading,
  } = useMutation(updateDoctorProfilePart2);

  const formik = useFormik({
    initialValues: doctorPersonalInfoForm,
    enableReinitialize: true,
    onSubmit: async () => {
      await savePersonalInfoMutation(doctorPersonalInfoForm);
      takeNextStep();
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, touched, errors } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    setDoctorPersonalInfoForm({ ...doctorPersonalInfoForm, [key]: value });
  };

  const getDoctorPersonalInfo = async () => {
    try {
      const { data } = await fetchDoctorPersonalInfo();
      if (data) {
        setDoctorPersonalInfoForm({
          biography: data.bio,
          diplomas: data.formations,
          languages: data.languages,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorPersonalInfo();
  }, []);

  return currentStep === 1 ? (
    <SetupLayout
      title={t('Tell us more about you')}
      description="Maybe you’d like to tell us more about yourself, docta ?"
      onNext={handleSubmit}
      loading={isSavePersonalInfoLoading}
      content={
        <div>
          <div style={{ marginBottom: 32 }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{t('doctor profile')}</Text>
          </div>
          <Form>
            <Row gutter={[35, 32]} align="middle">
              <Col span={24}>
                <Label
                  title={t('Doctor Biography (max 240 words)')}
                  error={touched.biography ? (errors.biography as string) : undefined}
                  required
                />
                <Form.Item
                  validateStatus={
                    touched.biography && Boolean(errors.biography) ? 'error' : undefined
                  }
                >
                  <Input.TextArea
                    //   prefix={<Icon name="user-2-line" />}
                    name="biography"
                    maxLength={240}
                    autoSize={{ minRows: 4 }}
                    value={values.biography}
                    placeholder={t('Tell your patients about you')}
                    onChange={handleChange}
                    onBlur={(e) => {
                      handleBlur(e);
                      handleFieldsChange(e.target.name, e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <Diplomas
            diplomas={doctorPersonalInfoForm.diplomas}
            updateDiplomas={(value) => handleFieldsChange('diplomas', value)}
          />
          <Languages
            languages={doctorPersonalInfoForm.languages}
            updateLanguages={(value) => handleFieldsChange('languages', value)}
          />
        </div>
      }
    />
  ) : null;
};

export default DoctorProfile2;
