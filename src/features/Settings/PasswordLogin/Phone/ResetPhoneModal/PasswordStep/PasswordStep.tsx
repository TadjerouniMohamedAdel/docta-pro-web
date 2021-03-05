import { Form, Input } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import Label from '../../../../../../components/Label/Label';
import Text from '../../../../../../components/Text/Text';
import Icon from '../../../../../../components/Icon/Icon';
import i18n from '../../../../../../i18n';
import Button from '../../../../../../components/Button/Button';
import { checkPassword } from '../../../services';

type Props = {
  setStep: (step: 1 | 2 | 3) => void;
};

type FormValue = {
  password: string;
};

const PasswordStep: React.FC<Props> = ({ setStep }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const { mutateAsync, isLoading } = useMutation(checkPassword);

  const onCheckPassword = async (values: FormValue) => {
    try {
      await mutateAsync({ password: values.password });
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: { password: '' },
    validationSchema: Yup.object({
      password: Yup.string().required(t('errors:required field')),
    }),
    onSubmit: onCheckPassword,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item style={{ marginBottom: 40 }}>
        <Text size="lg">{t('Enter your password to be able to change login phone number')}</Text>
      </Form.Item>
      <Form.Item
        validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
        style={{ marginBottom: 16 }}
      >
        <Label
          title={i18n.t('placeholders:enter', { fieldName: t(' password') })}
          error={touched.password ? (errors.password as string) : undefined}
          required
        />
        <Input.Password
          prefix={<Icon name="lock-2-line" />}
          name="password"
          value={values.password}
          placeholder={i18n.t('placeholders:enter your', { fieldName: t('password') })}
          onChange={handleChange}
          onBlur={handleBlur}
          iconRender={(visible) => (
            <span>{visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}</span>
          )}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" block loading={isLoading}>
        {t('next')}
      </Button>
    </Form>
  );
};

export default PasswordStep;
