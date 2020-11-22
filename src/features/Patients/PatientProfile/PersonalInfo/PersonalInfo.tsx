import { Col, Row, Form, Input, Avatar } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import Label from '../../../../components/Label/Label';
import Icon from '../../../../components/Icon/Icon';
import Button from '../../../../components/Button/Button';
import Select from '../../../../components/Select/Select';
import DatePicker from '../../../../components/DatePicker/DatePicker';

type Props = {};

const PersonalInfo: React.FC<Props> = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthday: null,
    gender: '',
    address: '',
    state: '',
    city: '',
    generalStatus: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => console.log('form submited'),
  });

  const { handleChange, handleBlur, values, handleSubmit, touched, errors } = formik;

  return (
    <div style={{ padding: '16px 80px' }}>
      <Form onFinish={handleSubmit}>
        <Row gutter={[35, 16]} align="middle">
          <Col>
            <Avatar src="" size={95} />
          </Col>
          <Col>
            <Button type="default" size="small" style={{ paddingLeft: 24, paddingRight: 24 }}>
              Change photo
            </Button>
          </Col>
        </Row>
        <Row gutter={[35, 16]}>
          <Col span={12}>
            <Label title="First name" error={touched.firstName ? errors.firstName : undefined} />
            <Form.Item
              validateStatus={touched.firstName && Boolean(errors.firstName) ? 'error' : undefined}
            >
              <Input
                prefix={<Icon name="user-line" />}
                name="firstName"
                value={values.firstName}
                placeholder="enter your first name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="Last name" error={touched.lastName ? errors.lastName : undefined} />
            <Form.Item
              validateStatus={touched.lastName && Boolean(errors.lastName) ? 'error' : undefined}
            >
              <Input
                prefix={<Icon name="user-line" />}
                name="lastName"
                value={values.lastName}
                placeholder="enter your last name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="Phone" error={touched.phone ? errors.phone : undefined} />
            <Form.Item
              validateStatus={touched.phone && Boolean(errors.phone) ? 'error' : undefined}
            >
              <Input
                prefix={<Icon name="phone-line" />}
                name="phone"
                value={values.phone}
                placeholder="enter your phone number"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="Email" error={touched.email ? errors.email : undefined} />
            <Form.Item
              validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
            >
              <Input
                prefix={<Icon name="mail-line" />}
                name="email"
                value={values.phone}
                placeholder="enter your email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="Birthday" error={touched.birthday ? errors.birthday : undefined} />
            <Form.Item
              validateStatus={touched.birthday && Boolean(errors.birthday) ? 'error' : undefined}
            >
              <DatePicker
                prefixIcon={<Icon name="mail-line" />}
                name="birthday"
                value={values.birthday}
                placeholder="enter your birthday"
                onChange={(date) => {
                  handleChange({
                    target: { name: 'birthday', value: date },
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="Gender" error={touched.email ? errors.email : undefined} />
            <Form.Item
              validateStatus={touched.email && Boolean(errors.email) ? 'error' : undefined}
            >
              <Select
                prefixIcon={<Icon name="genderless-line" />}
                placeholder="Select your gender"
                dropdownMatchSelectWidth={false}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Label title="State" error={touched.state ? errors.state : undefined} />
            <Form.Item
              validateStatus={touched.state && Boolean(errors.state) ? 'error' : undefined}
            >
              <Select
                prefixIcon={<Icon name="map-pin-line" />}
                placeholder="Select your state"
                dropdownMatchSelectWidth={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Label title="City" error={touched.city ? errors.city : undefined} />
            <Form.Item validateStatus={touched.city && Boolean(errors.city) ? 'error' : undefined}>
              <Select
                prefixIcon={<Icon name="road-map-line" />}
                placeholder="Select your City"
                dropdownMatchSelectWidth={false}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Label
              title="General Status"
              error={touched.generalStatus ? errors.generalStatus : undefined}
            />
            <Form.Item
              validateStatus={
                touched.generalStatus && Boolean(errors.generalStatus) ? 'error' : undefined
              }
            >
              <Input
                prefix={<Icon name="heart-pulse-line" />}
                name="generalStatus"
                value={values.generalStatus}
                placeholder="enter your general status"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PersonalInfo;
