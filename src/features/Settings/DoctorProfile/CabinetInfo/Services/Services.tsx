import { Col, Form, Input, Row, Tag } from 'antd';
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

  const handleAddService = () => {
    const updatedServices = [...services];
    updatedServices.push({ name: value, isNew: true });
    updateServices(updatedServices);
    setValue('');
  };

  const onDelete = (index: number) => {
    const updatedServices = [...services];
    updatedServices[index].isDeleted = true;
    updateServices(updatedServices);
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
            .map((service, index) => (
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
                <Input
                  autoFocus
                  size="small"
                  name="value"
                  value={value}
                  placeholder={i18n.t('placeholders:enter', {
                    fieldName: t('service'),
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
