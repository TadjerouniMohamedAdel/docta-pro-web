import { Col, Form, Input, Row, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { Button, Label, Icon, Text } from '../../../../../../components';
import { Service } from '../../types';
import i18n from '../../../../../../i18n';
import './styles.less';

type Props = {
  services: Service[];
  updateServices: (value: Service[]) => void;
};

const Services: React.FC<Props> = ({ services, updateServices }) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);

  const handleAddService = () => {
    const updatedServices = [...services];
    const id = uuidv4();
    updatedServices.push({ id, name: value, isNew: true });
    updateServices(updatedServices);
    setValue('');
  };

  const onDelete = (id: string) => {
    const updatedServices = [...services];

    const index = updatedServices.findIndex((item) => item.id === id);

    if (index > -1) {
      if (updatedServices[index].isNew) updatedServices.splice(index, 1);
      else updatedServices[index].isDeleted = true;
      updateServices(updatedServices);
    }
  };

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
          {services
            .filter((item) => !item.isDeleted)
            .map((service) => (
              <Col key={service.id}>
                <Tag key={service.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <Text>{service.name}</Text>
                  <Button
                    type="link"
                    className="btn-service-delete"
                    danger
                    size="small"
                    onClick={() => onDelete(service.id)}
                  >
                    <Icon name="close-circle-line" size={16} />
                  </Button>
                </Tag>
              </Col>
            ))}
          {visible ? (
            <Col>
              <Form.Item>
                <Input
                  autoFocus
                  size="small"
                  name="value"
                  value={value}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('services'),
                  })}
                  onChange={(e: any) => setValue(e.target.value)}
                  onPressEnter={handleAddService}
                  style={{ minWidth: 180 }}
                />
              </Form.Item>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};

export default Services;
