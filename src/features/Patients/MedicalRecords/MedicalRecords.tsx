import { Col, Form, Input, Row, Select as AntSelect } from 'antd';
import { FormikProps } from 'formik';
import React from 'react';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import Select from '../../../components/Select/Select';
import Icon from '../../../components/Icon/Icon';
import Text from '../../../components/Text/Text';
import RadioBox from './RadioBox/RadioBox';
import RecordsList from './RecordsList/RecordsList';
import { MedicalItems, MedicalRecordsForm } from '../types';
import i18n from '../../../i18n';

type Props = {
  handleFormChange: (values: any) => void;
  medicalRecordsForm: MedicalRecordsForm;
  handleAddNewItem: (name: MedicalItems, value: string) => void;
  handleDeleteItem: (name: MedicalItems, index: number) => void;
  formik: FormikProps<MedicalRecordsForm>;
};

const MedicalRecords: React.FC<Props> = ({
  medicalRecordsForm,
  handleFormChange,
  handleAddNewItem,
  handleDeleteItem,
  formik,
}) => {
  const { t } = useTranslation(['translation', 'placeholders']);

  const { handleChange, handleBlur, values } = formik;

  const handleFieldsChange = (key: string, value: any): void => {
    handleFormChange({ key, value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 600 }}>
      <Form style={{ padding: '30px 40px' }}>
        <Row gutter={[35, 24]} align="middle">
          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('height')}
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <InputMask
                name="height"
                mask="999"
                maskChar={null}
                placeholder={`${i18n.t('placeholders:enter', {
                  fieldName: t('height'),
                })}`}
                value={values.height}
                onChange={(e) =>
                  handleChange({
                    target: { name: 'height', value: e.target.value },
                  })
                }
                onBlur={(e) => {
                  handleBlur(e);
                  handleFieldsChange(e.target.name, parseInt(e.target.value, 0));
                }}
                dir="ltr"
              >
                {(inputProps: any) => <Input prefix={<Icon name="ruler-line" />} {...inputProps} />}
              </InputMask>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('weight')}
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <InputMask
                mask="999"
                maskChar={null}
                placeholder={`${i18n.t('placeholders:enter', {
                  fieldName: t('weight'),
                })}`}
                value={values.weight}
                onChange={(e) =>
                  handleChange({
                    target: { name: 'weight', value: e.target.value },
                  })
                }
                onBlur={(e) => {
                  handleBlur(e);
                  handleFieldsChange(e.target.name, parseInt(e.target.value, 0));
                }}
                dir="ltr"
              >
                {(inputProps: any) => (
                  <Input prefix={<Icon name="scales-2-line" />} {...inputProps} />
                )}
              </InputMask>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('blood type')}
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <Select
                value={values.bloodType}
                prefixIcon={<Icon name="drop-line" />}
                placeholder={`${i18n.t('placeholders:enter', {
                  fieldName: t('blood type'),
                })}`}
                dropdownMatchSelectWidth={false}
                onChange={(value) => {
                  handleChange({
                    target: { name: 'bloodType', value },
                  });
                  handleFieldsChange('bloodType', value);
                }}
              >
                <AntSelect.Option value="O+">O+</AntSelect.Option>
                <AntSelect.Option value="O-">O-</AntSelect.Option>
                <AntSelect.Option value="A+">A+</AntSelect.Option>
                <AntSelect.Option value="A-">A-</AntSelect.Option>
                <AntSelect.Option value="B+">B+</AntSelect.Option>
                <AntSelect.Option value="B-">B-</AntSelect.Option>
                <AntSelect.Option value="AB+">AB+</AntSelect.Option>
                <AntSelect.Option value="AB-">AB-</AntSelect.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('married')}?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox
                icon={<Icon name="user-6-fill" />}
                value={values.married}
                onChange={(e) => {
                  handleChange({
                    target: { name: 'married', value: e.target.value },
                  });
                  handleFieldsChange('married', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('smoking')}?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox
                icon={<Icon name="profile-line" />}
                value={values.smoking}
                onChange={(e) => {
                  handleChange({
                    target: { name: 'smoking', value: e.target.value },
                  });
                  handleFieldsChange('smoking', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Text size="lg" ellipsis>
              {t('alcohol')}?
            </Text>
          </Col>
          <Col span={9}>
            <Form.Item>
              <RadioBox
                icon={<Icon name="goblet-line" />}
                value={values.alcohol}
                onChange={(e) => {
                  handleChange({
                    target: { name: 'alcohol', value: e.target.value },
                  });
                  handleFieldsChange('alcohol', e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <RecordsList
          medicalRecordsForm={medicalRecordsForm}
          handleAddNewItem={handleAddNewItem}
          handleDeleteItem={handleDeleteItem}
        />
      </div>
    </div>
  );
};

export default MedicalRecords;
