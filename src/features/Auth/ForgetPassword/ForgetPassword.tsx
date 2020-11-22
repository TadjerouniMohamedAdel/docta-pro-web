import React from 'react';
import { Button, Input, Form, Alert } from 'antd';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useAuthState } from '../context';
import { login } from '../services';
import { AuthResponse, LoginParams } from '../types';
import Spacer from '../../../components/Spacer/Spacer';
import Link from '../../../components/Link/Link';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import Text from '../../../components/Text/Text';
import Card from '../../../components/Card/Card';
import illustration from '../../../assets/img/illustration.png';
import logo from '../../../assets/img/logo.png';
import Icon from '../../../components/Icon/Icon';
import Label from '../../../components/Label/Label';

const ForgetPassword: React.FC = () => {
  const { t } = useTranslation();
  const { setUser } = useAuthState();

  const history = useHistory();

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
        <Card style={{ padding: '40px 32px 40px 40px', maxWidth: 420 }}>
          <Form onFinish={handleSubmit} style={{ width: '100%', maxWidth: '100%' }}>
            <Spacer size="xxxl" direction="vertical">
              <Spacer size="md" direction="vertical" align="center">
                <img src={illustration} alt="illustration" />
                <img src={logo} alt="logo" />
              </Spacer>
              <Spacer size="xl" direction="vertical">
                <Text size="xxl">Forget Password?</Text>
                <Text size="md">
                  Enter the phone number associated with your account. We will send you a code to
                  reset your password.
                </Text>
                <Spacer size="md" direction="vertical">
                  <Spacer size="xs" direction="vertical">
                    <Label title={t('phone')} error={touched.phone ? errors.phone : undefined} />
                    <Form.Item
                      validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
                    >
                      <Input
                        prefix={<Icon name="phone-line" />}
                        name="phone"
                        placeholder={t('enter your phone number')}
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Form.Item>
                  </Spacer>

                  <Button type="primary" htmlType="submit" block loading={isLoading}>
                    {t('Next')}
                  </Button>

                  <Text size="sm" style={{ margin: '0 auto', display: 'block' }}>
                    {t('take me back to')}{' '}
                    <Link onClick={() => history.push('/')}>{t('sign in')}</Link>
                  </Text>
                </Spacer>
              </Spacer>
            </Spacer>
            {isError ? (
              <Alert message="something went wrong!" type="error" style={{ textAlign: 'center' }} />
            ) : null}
          </Form>
        </Card>
      </div>
    </AuthWrapper>
  );
};

export default ForgetPassword;
