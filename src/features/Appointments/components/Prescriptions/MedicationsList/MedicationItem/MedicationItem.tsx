import { Col, Row } from 'antd';
import React from 'react';
import { Button, Icon, Text } from '../../../../../../components';
import { MedicationRow } from '../../../../types';

type Props = {
  medicationRow: MedicationRow;
  deleteMedication: (id: string) => void;
};

const MedicationItem: React.FC<Props> = ({ medicationRow, deleteMedication }) => {
  if (!medicationRow) return null;

  const { id, name, unit, frequency, duration } = medicationRow;

  const handleDelete = () => {
    deleteMedication(id);
  };

  return (
    <Row align="middle" style={{ padding: '0 18px' }}>
      <Col span={2} />
      <Col span={6}>
        <Text size="sm">{name}</Text>
      </Col>
      <Col span={4}>
        <Text size="sm">{unit}</Text>
      </Col>
      <Col span={6}>
        <Text size="sm">{frequency}</Text>
      </Col>
      <Col span={4}>
        <Text size="sm">{duration}</Text>
      </Col>
      <Col span={2}>
        <Row justify="center">
          <Col>
            <Button type="text" size="small" className="delete-action" onClick={handleDelete}>
              <Icon name="delete-bin-7-line" />
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MedicationItem;
