import { Col, Form, Input, Row } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { Label } from '../../../../components';
import Diplomas from '../../../Settings/views/DoctorProfile/PersonalInfo/Diplomas/Diplomas';
import Languages from '../../../Settings/views/DoctorProfile/PersonalInfo/Languages/Languages';
import { fetchDoctorPersonalInfo } from '../../../Settings/views/DoctorProfile/services';
import SetupLayout from '../../SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { updateDoctorProfilePart2 } from '../../services';

type Props = {};

const DoctorProfile2: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { currentStep } = useSetupAccountState();
  const { takeNextStep } = useNextStep();
  const [loading, setLoading] = useState(false);
  const [doctorPersonalInfoForm, setDoctorPersonalInfoForm] = useState<any>({
    biography: '',
    diplomas: [],
    languages: [],
  });

  const { mutateAsync: savePersonalInfoMutation } = useMutation(updateDoctorProfilePart2);

  const validationSchema = Yup.object().shape({
    biography: Yup.string().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues: doctorPersonalInfoForm,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async () => {
      try {
        setLoading(true);
        await savePersonalInfoMutation(doctorPersonalInfoForm);
        await takeNextStep();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
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
      title={t('account setup step 2 title')}
      description={t('account setup step 2 description')}
      onNext={handleSubmit}
      loading={loading}
      header={t('doctor profile')}
      content={
        <div style={{ padding: '0 80px' }}>
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
