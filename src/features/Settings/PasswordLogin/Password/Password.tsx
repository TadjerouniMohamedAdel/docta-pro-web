import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Alert, Form, Input } from 'antd';
import { resetProPassword } from '../services';
import Spacer from '../../../../components/Spacer/Spacer';
import Label from '../../../../components/Label/Label';
import Icon from '../../../../components/Icon/Icon';
import i18n from '../../../../i18n';
import Button from '../../../../components/Button/Button';

type FormValue = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

type Props = {};

const Password: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const initialValues: FormValue = {
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  };

  const { mutate, isLoading, isError, isSuccess } = useMutation(resetProPassword);

  const onResetPassword = async (values: FormValue, { resetForm }: FormikHelpers<FormValue>) => {
    try {
      await mutate({ oldPassword: values.currentPassword, newPassword: values.newPassword });
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(t('errors:required field')),
      newPassword: Yup.string().required(t('errors:required field')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('newPassword'), undefined], t('errors:passwords must match'))
        .required(t('errors:required field')),
    }),
    onSubmit: onResetPassword,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  const handleErrors = (): string | undefined => {
    if (touched.passwordConfirmation) return errors.passwordConfirmation;
    if (touched.newPassword) return errors.newPassword;
    return undefined;
  };

  return (
    <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%', marginTop: 40 }}>
      <Spacer size="md" direction="vertical">
        <Spacer size="xs" direction="vertical">
          <Form.Item
            validateStatus={
              touched.currentPassword && Boolean(errors.currentPassword) ? 'error' : undefined
            }
          >
            <Label
              title={t('current password')}
              error={touched.currentPassword ? (errors.currentPassword as string) : undefined}
              required
            />
            <Input.Password
              prefix={<Icon name="lock-2-line" />}
              name="currentPassword"
              value={values.currentPassword}
              placeholder={i18n.t('placeholders:enter your', { fieldName: t('current password') })}
              onChange={handleChange}
              onBlur={handleBlur}
              iconRender={(visible) => (
                <span>{visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}</span>
              )}
            />
          </Form.Item>
          <Form.Item
            validateStatus={
              touched.newPassword && Boolean(errors.newPassword) ? 'error' : undefined
            }
          >
            <Label title={t('new password')} error={handleErrors()} required />
            <Input.Password
              prefix={<Icon name="lock-2-line" />}
              name="newPassword"
              value={values.newPassword}
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
            <Label title={t('confirm new password')} error={handleErrors()} required />
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
          {t('update password')}
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
    </Form>
  );
};

export default Password;
