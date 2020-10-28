import React from 'react';
import { Button, Input, Form, Typography, Alert } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useAuthState } from './context';
import { login } from './services';
import { AuthResponse, LoginParams } from './types';
import Spacer from '../../components/Spacer/Spacer';
import Link from '../../components/Link/Link';
import AuthWrapper from './AuthWrapper/AuthWrapper';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuthState();

  const [mutate, { isLoading, isError }] = useMutation(login);

  const onLogin = async (values: LoginParams): Promise<void> => {
    try {
      const response: AuthResponse | undefined = await mutate(values);
      if (response) {
        localStorage.setItem('token', response.data.token);
        setUser({ username: 'mohamed' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues: LoginParams = { phone: '', password: '' };

  const validationSchema = Yup.object().shape({
    // email: Yup.string().required(t('required field')).email(t('must be a valid email')),
    phone: Yup.string().required(t('required field')),
    password: Yup.string().required(t('required field')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onLogin,
  });

  const { handleChange, handleBlur, values, handleSubmit } = formik;

  return (
    <AuthWrapper>
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 10,
          maxWidth: '100%',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Typography.Title level={2}>{t('title')}</Typography.Title>
          <Typography.Title level={5} style={{ marginBottom: 35 }}>
            {t('Welcome, please login to access the app')}
          </Typography.Title>
        </div>

        <Form onFinish={handleSubmit} style={{ width: 400, maxWidth: '100%' }}>
          <Spacer size="md" direction="vertical">
            <Spacer size="xs" direction="vertical">
              <Typography.Text>{t('phone')}</Typography.Text>
              <Input
                name="phone"
                placeholder={t('enter your phone number')}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Spacer>

            <Spacer size="xs" direction="vertical">
              <Typography.Text>{t('password')}</Typography.Text>
              <Input.Password
                name="password"
                value={values.password}
                placeholder={t('enter your password')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Link style={{ fontSize: 12 }} onClick={() => console.log('forgot password')}>
                Forgot password?
              </Link>
            </Spacer>

            <Button
              type="primary"
              htmlType="submit"
              className="login-button bee-btn-filled"
              block
              loading={isLoading}
            >
              {t('login')}
            </Button>

            <Typography.Text>By Clever Zone</Typography.Text>
          </Spacer>
          {isError ? (
            <Alert
              message="Email or password incorrect !"
              type="error"
              style={{ textAlign: 'center' }}
            />
          ) : null}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Auth;
