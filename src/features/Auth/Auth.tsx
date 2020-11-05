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
import Text from '../../components/Text/Text';
import Card from '../../components/Card/Card';
import illustration from '../../assets/img/illustration.png';
import logo from '../../assets/img/logo.png';
import Icon from '../../components/Icon/Icon';
import Label from '../../components/Label/Label';

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

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

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
        <Card style={{ padding: '40px 48px 24px 48px', maxWidth: 408 }}>
          <Form onFinish={handleSubmit} style={{ width: 400, maxWidth: '100%' }}>
            <Spacer size="md" direction="vertical">
              <Spacer size="md" direction="vertical" align="center">
                <img src={illustration} alt="illustration" />
                <img src={logo} alt="logo" />
              </Spacer>
              <Spacer size="xs" direction="vertical">
                <Label title={t('phone')} error={errors.phone} />
                <Form.Item
                  validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
                >
                  <Input
                    prefix={<Icon name="phone" />}
                    name="phone"
                    placeholder={t('enter your phone number')}
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Spacer>

              <Spacer size="xs" direction="vertical">
                <Typography.Text>{t('password')}</Typography.Text>
                <Input.Password
                  prefix={<Icon name="lock-2" />}
                  name="password"
                  value={values.password}
                  placeholder={t('enter your password')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  iconRender={(visible) =>
                    visible ? <Icon name="eye" /> : <Icon name="eye-off" />
                  }
                />
                <Link style={{ fontSize: 12 }} onClick={() => console.log('forgot password')}>
                  Forgot password?
                </Link>
              </Spacer>

              <Spacer size="xxxl" direction="vertical">
                <Button type="primary" htmlType="submit" block loading={isLoading}>
                  {t('login')}
                </Button>

                <Text size="sm" style={{ margin: '0 auto', textAlign: 'center', display: 'block' }}>
                  {t('dont have an account')} <Link>Sign in</Link>
                </Text>
              </Spacer>
            </Spacer>
            {isError ? (
              <Alert
                message="Email or password incorrect !"
                type="error"
                style={{ textAlign: 'center' }}
              />
            ) : null}
          </Form>
        </Card>
      </div>
    </AuthWrapper>
  );
};

export default Auth;
