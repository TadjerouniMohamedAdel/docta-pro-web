import React from 'react';
import { Button, Input, Form, Typography, Row, Col, Alert } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useAuthState } from './context';
import { login } from './services';
import { AuthResponse, LoginParams } from './types';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuthState();

  const [mutate, { isLoading, isError }] = useMutation(login);

  const onLogin = async (values: LoginParams): Promise<void> => {
    try {
      const response: AuthResponse | undefined = await mutate(values);
      if (response) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues: LoginParams = { email: '', password: '' };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(t('required field')).email(t('must be a valid email')),
    password: Yup.string().required(t('required field')),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: onLogin,
  });

  const { touched, handleChange, handleBlur, errors, values, handleSubmit } = formik;

  return (
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
        <Row gutter={[16, 8]}>
          <Col span={24}>
            <Form.Item
              validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
              help={errors.email}
            >
              <Input
                size="large"
                name="email"
                placeholder={t('email')}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="login-input"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              validateStatus={touched.password && Boolean(errors.password) ? 'error' : undefined}
              help={errors.password}
            >
              <Input.Password
                size="large"
                name="password"
                value={values.password}
                placeholder={t('password')}
                onChange={handleChange}
                onBlur={handleBlur}
                className="login-input"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="login-button bee-btn-filled"
                block
                loading={isLoading}
              >
                {t('login')}
              </Button>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Typography.Text>By Clever Zone</Typography.Text>
          </Col>
          {isError ? (
            <Col span={24}>
              <Alert
                message="Email or password incorrect !"
                type="error"
                style={{ textAlign: 'center' }}
              />
            </Col>
          ) : null}
        </Row>
      </Form>
    </div>
  );
};

export default Auth;
