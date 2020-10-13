import React from 'react';
import { Button, Input, Form, Typography, Row, Col } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useAuthState } from './context';
import { login } from './services';

const Auth = () => {
  const { t } = useTranslation();
  const { setUser } = useAuthState();

  const [mutate, { isLoading }] = useMutation(login);

  const onLogin = async (values) => {
    try {
      const response = await mutate(values);
      localStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (err) {
      console.log(err);
    }
  };

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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required(t('required field'))
            .email(t('must be a valid email')),
          password: Yup.string().required(t('required field')),
        })}
        onSubmit={(values) => {
          onLogin(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form
            onFinish={handleSubmit}
            style={{ width: 400, maxWidth: '100%' }}
          >
            <Row gutter={[16, 8]}>
              <Col span={24}>
                <Form.Item
                  validateStatus={
                    touched.email && Boolean(errors.email) ? 'error' : null
                  }
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
                  validateStatus={
                    touched.password && Boolean(errors.password)
                      ? 'error'
                      : null
                  }
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
            </Row>
          </Form>
        )}
      </Formik>
      <Typography.Text style={{ textAlign: 'center' }}>
        By Clever Zone
      </Typography.Text>
    </div>
  );
};

export default Auth;
