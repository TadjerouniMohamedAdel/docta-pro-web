import { Col, Form, Input, Row, Select as AntSelect } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import Select from '../../../../components/Select/Select';
import Icon from '../../../../components/Icon/Icon';
import Text from '../../../../components/Text/Text';
import RadioBox from './RadioBox/RadioBox';
import RecordsList from './RecordsList/RecordsList';

type Props = {};

const MedicalRecords: React.FC<Props> = () => {
  const initialValues = {
    height: undefined,
    weight: undefined,
    bloodType: undefined,
    married: null,
    smoking: null,
    alcohol: null,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => console.log('form submited'),
  });

  const { handleChange, handleBlur, values, handleSubmit } = formik;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Form onFinish={handleSubmit} style={{ padding: '30px 40px' }}>
        <Row gutter={[35, 24]} align="middle">
          <Col span={3}>
            <Text size="lg" ellipsis>
              Height
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Input
                prefix={<Icon name="ruler-line" />}
                name="height"
                value={values.height}
                placeholder="enter your height"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Text size="lg" ellipsis>
              Weight
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Input
                prefix={<Icon name="scales-2-line" />}
                name="weight"
                value={values.weight}
                placeholder="enter your weight"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Text size="lg" ellipsis>
              Blood type
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Select
                value={values.bloodType}
                prefixIcon={<Icon name="drop-line" />}
                placeholder="Select your blood type"
                dropdownMatchSelectWidth={false}
              >
                <AntSelect.Option value="o+">O+</AntSelect.Option>
                <AntSelect.Option value="o-">O-</AntSelect.Option>
                <AntSelect.Option value="a+">A+</AntSelect.Option>
                <AntSelect.Option value="a-">A-</AntSelect.Option>
                <AntSelect.Option value="b+">B+</AntSelect.Option>
                <AntSelect.Option value="b-">B-</AntSelect.Option>
                <AntSelect.Option value="ab+">AB+</AntSelect.Option>
                <AntSelect.Option value="ab-">AB-</AntSelect.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              Married?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox icon={<Icon name="profile-line" />} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              Smoking?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox icon={<Icon name="profile-line" />} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              Alcohol?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox icon={<Icon name="goblet-line" />} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ flexGrow: 1 }}>
        <RecordsList />
      </div>
    </div>
  );
};

export default MedicalRecords;
