import { Form } from 'antd';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import { Text, Button, PhoneInput } from '../../../../../../../components';
import i18n from '../../../../../../../i18n';
import firebaseApp from '../../../../../../../firebase';
import { CheckPhoneNumber } from '../../../../../../Auth/services';

type Props = {
  setConfirmationResult: (value: firebase.auth.ConfirmationResult) => void;
  setStep: (step: 1 | 2 | 3) => void;
  setPhoneNumber: (phoneNumber: string) => void;
};

type FormValue = {
  phone: string;
};

const PhoneStep: React.FC<Props> = ({ setConfirmationResult, setStep, setPhoneNumber }) => {
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
    const phone = values.phone.replace(/ /g, '');
    try {
      await CheckPhoneNumber(phone);
    } catch (error) {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchRef.current, {
        size: 'invisible',
      });

      const result = await firebaseApp.auth().signInWithPhoneNumber(phone, recaptchaVerifier);
      setConfirmationResult(result);
      setPhoneNumber(values.phone);
      setStep(3);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onPhoneVerification,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item style={{ marginBottom: 40 }}>
        <Text size="lg">{t('new phone description')}</Text>
      </Form.Item>
      <div style={{ marginBottom: 16 }}>
        <PhoneInput
          required
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          name="phone"
          label={t('placeholders:enter', {
            fieldName: t('new login phone number'),
          })}
          error={touched.phone ? errors.phone : undefined}
          placeholder={`+213 ${i18n.t('placeholders:enter your', {
            fieldName: t('Docta phone number'),
          })}`}
        />
      </div>

      <Button type="primary" htmlType="submit" block loading={loading}>
        {t('next')}
      </Button>
      <div ref={recaptchRef} id="recaptcha-container" />
    </Form>
  );
};

export default PhoneStep;
