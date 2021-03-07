import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import InputMask from 'react-input-mask';
import Label from '../../../../../../components/Label/Label';
import Text from '../../../../../../components/Text/Text';
import Icon from '../../../../../../components/Icon/Icon';
import i18n from '../../../../../../i18n';
import Button from '../../../../../../components/Button/Button';
import firebaseApp from '../../../../../../firebase';
import { CheckPhoneNumber } from '../../../../../Auth/services';

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

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required(t('errors:required field')),
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
      console.log('result', result);
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
        <Text size="lg">
          {t(
            'Enter your new login phone number for your account. We will send you a code to reset your password.',
          )}
        </Text>
      </Form.Item>
      <Form.Item
        validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
        style={{ marginBottom: 16 }}
      >
        <Label
          title={i18n.t('placeholders:enter', {
            fieldName: t('New Login Phone Number'),
          })}
          error={touched.phone ? errors.phone : undefined}
        />

        <InputMask
          mask="+213 999 999 999"
          maskChar={null}
          placeholder={`+213 ${i18n.t('placeholders:enter your', {
            fieldName: t('Docta phone number'),
          })}`}
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          dir="ltr"
        >
          {(inputProps: any) => (
            <Input
              dir="ltr"
              prefix={<Icon name="phone-line" />}
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              {...inputProps}
            />
          )}
        </InputMask>
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={loading}>
        {t('next')}
      </Button>
      <div ref={recaptchRef} id="recaptcha-container" />
    </Form>
  );
};

export default PhoneStep;
