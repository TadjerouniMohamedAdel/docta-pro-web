import React from 'react';
import { Button, Input, Form, Alert } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useAuthState } from '../../context';
import { login } from '../../services';
import { AuthResponse, LoginParams } from '../../types';
import { Spacer, Link, Text, Icon, Label, PhoneInput } from '../../../../components';
import i18n from '../../../../i18n';

const Login: React.FC = () => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);
  const { setUser } = useAuthState();

  const history = useHistory();

  const { mutateAsync, isLoading, isError } = useMutation(login);

  const onLogin = async (values: LoginParams): Promise<void> => {
    const response: AuthResponse | undefined = await mutateAsync(values);
    if (response) setUser(response.data);
  };

  const initialValues: LoginParams = { phone: '', password: '' };

  const phoneRegEx = /(\+[0-9]{11,12})/;

  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .required(t('errors:required field'))
      .matches(phoneRegEx, i18n.t('errors:must be a valid', { fieldName: t('phone number') })),
    password: Yup.string().required(t('errors:required field')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onLogin,
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <Form onFinish={handleSubmit} style={{ width: 420, maxWidth: '100%' }}>
      <Spacer size="sm" direction="vertical">
        <Spacer size="xss" direction="vertical">
          <PhoneInput
            required
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            name="phone"
            label={t('phone')}
            error={touched.phone ? errors.phone : undefined}
            placeholder={`+213 ${t('placeholders:enter', {
              fieldName: t('phone'),
            })}`}
          />
        </Spacer>
        <Spacer size="xss" direction="vertical">
          <Label title={t('password')} error={touched.password ? errors.password : undefined} />
          <Form.Item
            validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
          >
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
          <Link style={{ fontSize: 12 }} onClick={() => history.push('/forget-password')}>
            {t('forgot password')}
          </Link>
        </Spacer>

        <Spacer size="md" direction="vertical">
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            {t('login')}
          </Button>

          {isError ? (
            <Alert
              message={
                <Text size="sm" style={{ color: 'white' }}>
                  {t('invalid combination')}
                </Text>
              }
              type="error"
              style={{ textAlign: 'center' }}
            />
          ) : null}
          <Text size="sm" style={{ margin: '0 auto', textAlign: 'center', display: 'block' }}>
            {t('dont have an account')} <Link>{t('sign up')}</Link>
          </Text>
        </Spacer>
      </Spacer>
    </Form>
  );
};

export default Login;
