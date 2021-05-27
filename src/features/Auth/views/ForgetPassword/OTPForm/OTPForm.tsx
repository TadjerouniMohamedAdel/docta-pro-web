import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import InputMask from 'react-input-mask';
import { Spacer, Text, Button } from '../../../../../components';

type Props = {
  confirmationResult: firebase.auth.ConfirmationResult | undefined;
  setStep: (step: number) => void;
  setTokenId: (tokenId: string) => void;
  phoneNumber: string;
};

type FormValue = {
  otpCode: string;
};

const OTPForm: React.FC<Props> = ({ confirmationResult, setStep, setTokenId, phoneNumber }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: FormValue = { otpCode: '' };

  const onConfirmCode = async (value: FormValue) => {
    setLoading(true);
    try {
      const result = await confirmationResult?.confirm(value.otpCode);
      const tokenId = await result?.user?.getIdToken();
      if (tokenId) {
        setTokenId(tokenId);
        setLoading(false);
        setStep(3);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onConfirmCode,
  });

  const { handleChange, values, handleSubmit, touched, errors } = formik;
  return (
    <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%', marginTop: 100 }}>
      <Spacer size="xl" direction="vertical">
        <Text size="xxxl" style={{ fontWeight: 'bold' }}>
          {t('placeholders:enter otp')}
        </Text>
        <Spacer size="md" direction="vertical">
          <Spacer size="xs" direction="vertical">
            <Text size="lg">
              {t('placeholders:enter code we sent you to')} <strong>{phoneNumber}</strong>
            </Text>
            <Form.Item
              validateStatus={touched.otpCode && Boolean(errors.otpCode) ? 'error' : undefined}
            >
              <InputMask
                mask="999999"
                alwaysShowMask
                maskChar="-"
                value={values.otpCode}
                onChange={handleChange}
              >
                {(inputProps: any) => (
                  <Input
                    name="otpCode"
                    value={values.otpCode}
                    onChange={handleChange}
                    style={{ letterSpacing: 25, textAlign: 'center', maxHeight: 48, fontSize: 30 }}
                    {...inputProps}
                  />
                )}
              </InputMask>
            </Form.Item>
          </Spacer>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ textTransform: 'uppercase' }}
          >
            {t('next')}
          </Button>
        </Spacer>
      </Spacer>
    </Form>
  );
};

export default OTPForm;
