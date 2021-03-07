import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import firebase from 'firebase';
import InputMask from 'react-input-mask';
import Text from '../../../../../../components/Text/Text';
import Button from '../../../../../../components/Button/Button';
import Label from '../../../../../../components/Label/Label';
import i18n from '../../../../../../i18n';
import { updatePhone } from '../../../services';
import { useAuthState } from '../../../../../Auth';
import { User } from '../../../../../Auth/types';

type Props = {
  confirmationResult: firebase.auth.ConfirmationResult | undefined;
  phoneNumber: string;
  setVisible: (value: boolean) => void;
};

type FormValue = {
  otpCode: string;
};

const OTPFormStep: React.FC<Props> = ({ confirmationResult, phoneNumber, setVisible }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues: FormValue = { otpCode: '' };

  const { user, setUser } = useAuthState();

  const onConfirmCode = async (value: FormValue) => {
    setLoading(true);
    try {
      const result = await confirmationResult?.confirm(value.otpCode);
      const tokenId = await result?.user?.getIdToken();
      if (tokenId) {
        await updatePhone({ tokenId });
        setUser({ ...(user as User), phone: phoneNumber });
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit: onConfirmCode,
  });

  const { handleChange, values, handleSubmit, touched, errors } = formik;
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item style={{ marginBottom: 40 }}>
        <Text size="lg">
          {t('Enter the code from SMS we sent you to')} <strong>{phoneNumber}</strong>
        </Text>
      </Form.Item>
      <Form.Item
        validateStatus={touched.otpCode && Boolean(errors.otpCode) ? 'error' : undefined}
        style={{ marginBottom: 16 }}
      >
        <Label
          title={i18n.t('placeholders:enter', {
            fieldName: t('code'),
          })}
          error={touched.otpCode ? errors.otpCode : undefined}
        />

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

      <Button type="primary" htmlType="submit" block loading={loading}>
        {t('done')}
      </Button>
    </Form>
  );
};

export default OTPFormStep;
