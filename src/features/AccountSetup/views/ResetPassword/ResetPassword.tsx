import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { Button, Icon, Label, Spacer } from '../../../../components';
import SetupLayout from '../../SetupLayout';
import { useSetupAccountState } from '../../context';
import { useNextStep } from '../../hooks';
import { resetProPassword } from '../../../Settings/views/PasswordLogin/services';

type FormValue = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

type Props = {};

const ResetPassword: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const { currentStep } = useSetupAccountState();
  const { finishSteps } = useNextStep();
  const [loading, setLoading] = useState(false);

  const initialValues: FormValue = {
    currentPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  };

  const { mutateAsync } = useMutation(resetProPassword);

  const onResetPassword = async (values: FormValue, { resetForm }: FormikHelpers<FormValue>) => {
    try {
      setLoading(true);
      await mutateAsync({ password: values.currentPassword, newPassword: values.newPassword });
      resetForm();
      await finishSteps();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

  return currentStep === 6 ? (
    <SetupLayout
      title={t('account setup step 7 title')}
      description={t('account setup step 7 description')}
      onSkip={() => finishSteps()}
      header={t('Updating Password')}
      loading={loading}
      content={
        <div style={{ padding: '0 80px', display: 'flex', justifyContent: 'center' }}>
          <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%', marginTop: 40 }}>
            <Spacer size="xxl" direction="vertical">
              <Spacer size="xxl" direction="vertical">
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
                    placeholder={t('placeholders:enter your', {
                      fieldName: t('current password'),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    iconRender={(visible) => (
                      <span>
                        {visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}
                      </span>
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
                    placeholder={t('placeholders:enter your', {
                      fieldName: t('new password'),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    iconRender={(visible) => (
                      <span>
                        {visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}
                      </span>
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
                    placeholder={t('placeholders:confirm your', {
                      fieldName: t('new password'),
                    })}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    iconRender={(visible) => (
                      <span>
                        {visible ? <Icon name="eye-line" /> : <Icon name="eye-off-line" />}
                      </span>
                    )}
                  />
                </Form.Item>
              </Spacer>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={!(formik.dirty && formik.isValid)}
              >
                {t('update password')}
              </Button>
            </Spacer>
          </Form>
        </div>
      }
    />
  ) : null;
};

export default ResetPassword;
