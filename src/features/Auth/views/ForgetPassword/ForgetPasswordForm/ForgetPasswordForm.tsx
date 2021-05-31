import React, { useRef, useState } from 'react';
import { Form } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import firebase from 'firebase';
import { Spacer, Text, Button } from '../../../../../components';
import i18n from '../../../../../i18n';
import firebaseApp from '../../../../../firebase';
import { CheckPhoneNumber } from '../../../services';
import PhoneInput from '../../../../../components/PhoneInput/PhoneInput';

type Props = {
  setConfirmationResult: (value: firebase.auth.ConfirmationResult) => void;
  setStep: (step: number) => void;
  setPhoneNumber: (phoneNumber: string) => void;
};

type FormValue = {
  phone: string;
};

const ForgetPasswordForm: React.FC<Props> = ({
  setConfirmationResult,
  setStep,
  setPhoneNumber,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const [loading, setLoading] = useState<boolean>(false);

  const recaptchRef = useRef<HTMLDivElement>(null);

  const initialValues: FormValue = { phone: '' };

  const phoneRegEx = /(\+[0-9]{11,12})/;

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t('errors:required field'))
      .matches(phoneRegEx, i18n.t('errors:must be a valid', { fieldName: t('phone number') })),
  });

  const onPhoneVerification = async (values: FormValue) => {
    setLoading(true);
    try {
      const phone = values.phone.replace(/ /g, '');
      await CheckPhoneNumber(phone);
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchRef.current, {
        size: 'invisible',
      });

      const result = await firebaseApp.auth().signInWithPhoneNumber(phone, recaptchaVerifier);

      setLoading(false);
      setConfirmationResult(result);
      setPhoneNumber(values.phone);
      setStep(2);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onPhoneVerification,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;
  return (
    <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%', marginTop: 40 }}>
      <Spacer size="xl" direction="vertical">
        <Text size="xxxl" style={{ fontWeight: 'bold' }}>
          {t('forgot password')}
        </Text>
        <Text size="md">{t('forgot password description')}</Text>
        <Spacer size="md" direction="vertical">
          <PhoneInput
            required
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone"
            label={t('phone')}
            error={touched.phone ? errors.phone : undefined}
            placeholder={`+213 ${i18n.t('placeholders:enter your', {
              fieldName: t('Docta phone number'),
            })}`}
          />

          <Button type="primary" htmlType="submit" block loading={loading}>
            {t('next')}
          </Button>
        </Spacer>
      </Spacer>
      <div ref={recaptchRef} id="recaptcha-container" />
    </Form>
  );
};

export default ForgetPasswordForm;
