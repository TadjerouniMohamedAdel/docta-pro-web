import { Col, Form, Input, Row, Select as AntSelect } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import Select from '../../../../components/Select/Select';
import Icon from '../../../../components/Icon/Icon';
import Text from '../../../../components/Text/Text';
import RadioBox from './RadioBox/RadioBox';
import RecordsList from './RecordsList/RecordsList';
import { MedicalRecordsForm } from '../../types';

type Props = {
  handleFormChange: (values: any) => void;
  medicalRecordsForm: MedicalRecordsForm;
};

const MedicalRecords: React.FC<Props> = ({ medicalRecordsForm, handleFormChange }) => {
  const formik = useFormik({
    initialValues: medicalRecordsForm,
    onSubmit: () => {},
  });

  const { handleChange, values } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    console.log(key, value);
    handleFormChange({ key, value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Form style={{ padding: '30px 40px' }} initialValues={medicalRecordsForm}>
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
                onBlur={(e) => {
                  handleFieldsChange(e.target.name, e.target.value);
                }}
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
                onBlur={(e) => {
                  handleFieldsChange(e.target.name, e.target.value);
                }}
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
                onChange={(value) => {
                  handleChange({
                    target: { name: 'bloodType', value },
                  });
                  handleFieldsChange('bloodType', value);
                }}
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
              <RadioBox
                icon={<Icon name="profile-line" />}
                value={values.married}
                onChange={(e) => {
                  handleChange(e);
                  handleFieldsChange('married', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              Smoking?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox
                icon={<Icon name="profile-line" />}
                value={values.smoking}
                onChange={(e) => {
                  handleChange(e);
                  handleFieldsChange('smoking', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              Alcohol?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox
                icon={<Icon name="goblet-line" />}
                value={values.alcohol}
                onChange={(e) => {
                  handleChange(e);
                  handleFieldsChange('alcohol', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ flexGrow: 1 }}>
        <RecordsList handleFormChange={handleFormChange} medicalRecordsForm={medicalRecordsForm} />
      </div>
    </div>
  );
};

export default MedicalRecords;
