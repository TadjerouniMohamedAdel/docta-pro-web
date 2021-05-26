import React from 'react';
import { Alert, Form, Input } from 'antd';
import { FormikHelpers, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import Spacer from '../../../../../components/Spacer/Spacer';
import Text from '../../../../../components/Text/Text';
import Label from '../../../../../components/Label/Label';
import Button from '../../../../../components/Button/Button';
import Icon from '../../../../../components/Icon/Icon';
import i18n from '../../../../../i18n';
import { resetPassword } from '../../../services';

type Props = {
  tokenId: string;
};

type FormValue = {
  password: string;
  passwordConfirmation: string;
};

const ResetPasswordForm: React.FC<Props> = ({ tokenId }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const initialValues: FormValue = { password: '', passwordConfirmation: '' };

  const { mutate, isLoading, isError, isSuccess } = useMutation(resetPassword);

  const onResetPassword = async (values: FormValue, { resetForm }: FormikHelpers<FormValue>) => {
    try {
      await mutate({ password: values.password, tokenId });
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      password: Yup.string().required(t('errors:required field')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), undefined], t('errors:passwords must match'))
        .required(t('errors:required field')),
    }),
    onSubmit: onResetPassword,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const handleErrors = (): string | undefined => {
    if (touched.passwordConfirmation) return errors.passwordConfirmation;
    if (touched.password) return errors.password;
    return undefined;
  };

  return (
    <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%', marginTop: 40 }}>
      <Spacer size="xl" direction="vertical">
        <Text size="xxxl" style={{ fontWeight: 'bold' }}>
          {t('reset password')}
        </Text>
        <Spacer size="md" direction="vertical">
          <Spacer size="xs" direction="vertical">
            <Label
              title={i18n.t('placeholders:enter your', { fieldName: t('new password') })}
              error={handleErrors()}
            />
            <Form.Item
              validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
            >
              <Input.Password
                prefix={<Icon name="lock-2-line" />}
                name="password"
                value={values.password}
                placeholder={i18n.t('placeholders:enter your', { fieldName: t('new password') })}
                onChange={handleChange}
                onBlur={handleBlur}
                iconRender={(visible) => (
                  <span>{visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}</span>
                )}
              />
            </Form.Item>
            <Form.Item
              validateStatus={
                touched.passwordConfirmation && Boolean(errors.passwordConfirmation)
                  ? 'error'
                  : undefined
              }
            >
              <Input.Password
                prefix={<Icon name="lock-2-line" />}
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                placeholder={i18n.t('placeholders:confirm your', { fieldName: t('new password') })}
                onChange={handleChange}
                onBlur={handleBlur}
                iconRender={(visible) => (
                  <span>{visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}</span>
                )}
              />
            </Form.Item>
          </Spacer>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {t('reset password')}
          </Button>
          {isError ? (
            <Alert
              message="Oops! Something went wrong !"
              type="error"
              style={{ textAlign: 'center' }}
            />
          ) : null}
          {isSuccess ? (
            <Alert
              message="Your password has been successfully reset!"
              type="success"
              style={{ textAlign: 'center' }}
            />
          ) : null}
        </Spacer>
      </Spacer>
    </Form>
  );
};

export default ResetPasswordForm;
