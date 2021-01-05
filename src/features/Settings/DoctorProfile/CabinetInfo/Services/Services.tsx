import { AutoComplete, Col, Form, Input, Row, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../../../../components/Button/Button';
import Label from '../../../../../components/Label/Label';
import Icon from '../../../../../components/Icon/Icon';
import Text from '../../../../../components/Text/Text';
import { Service } from '../../types';
import i18n from '../../../../../i18n';
import './styles.less';

type Props = {
  services: Service[];
  updateServices: (value: Service[]) => void;
};

const Services: React.FC<Props> = ({ services, updateServices }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Service[]>([]);

  const handleOnSearch = (term: string) => {
    console.log(term);
    setData([
      { id: '111', name: 'ECG Analyse' },
      { id: '222', name: 'service 2' },
    ]);
  };

  const handleOnSelect = (term: string, option: any) => {
    const updatedServices = [...services];
    updatedServices.push({ id: option.key, name: option.children });
    updateServices(updatedServices);
    setValue('');
  };

  const handleOnChange = (term: string, option: any) => {
    setValue(option.key);
  };

  const onDelete = (index: number) => {
    const updatedServices = [...services];
    updatedServices.splice(index, 1);
    updateServices(updatedServices);
  };

  const options = data.map((item) => (
    <AutoComplete.Option
      key={item.id}
      value={item.id}
      disabled={!!services.find((service) => service.id === item.id)}
    >
      {item.name}
    </AutoComplete.Option>
  ));

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between" align="bottom">
          <Col>
            <Label title={t('services')} />
          </Col>
          <Col>
            <Button
              type="link"
              style={{ paddingRight: 0, paddingLeft: 0 }}
              onClick={() => setVisible(true)}
            >
              <Icon name="add-line" />
            </Button>
          </Col>
        </Row>
        <Row gutter={[8, 8]} align="middle">
          {services.map((service, index) => (
            <Col key={service.id}>
              <Tag key={service.id} style={{ display: 'flex', alignItems: 'center' }}>
                <Text>{service.name}</Text>
                <Button
                  type="link"
                  className="btn-service-delete"
                  danger
                  size="small"
                  onClick={() => onDelete(index)}
                >
                  <Icon name="close-circle-line" />
                </Button>
              </Tag>
            </Col>
          ))}
          {visible ? (
            <Col>
              <Form.Item>
                <AutoComplete
                  allowClear
                  value={value}
                  onSelect={handleOnSelect}
                  onSearch={handleOnSearch}
                  onChange={handleOnChange}
                  style={{ minWidth: 180 }}
                  size="small"
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('service'),
                  })}
                  getInputElement={() => <Input size="small" />}
                >
                  {options}
                </AutoComplete>
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};

export default Services;
