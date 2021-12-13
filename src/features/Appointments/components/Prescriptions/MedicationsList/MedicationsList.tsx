import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../../../../../components';
import { MedicationRow } from '../../../types';
import MedicationItem from './MedicationItem/MedicationItem';

type Props = {
  medications: MedicationRow[];
  deleteMedication: (id: string) => void;
};

const MedicationsList: React.FC<Props> = ({ medications, deleteMedication }) => {
  const { t } = useTranslation();

  return (
    <div>
      {/* list header row */}
      <Row align="middle" style={{ padding: '0 40px' }}>
        <Col span={6}>
          <Text size="md" strong>
            {t('medication')}
          </Text>
        </Col>
        <Col span={4}>
          <Text size="md" strong>
            {t('units')}
          </Text>
        </Col>
        <Col span={8}>
          <Text size="md" strong>
            {t('frequency')}
          </Text>
        </Col>
        <Col span={4}>
          <Text size="md" strong>
            {t('duration')}
          </Text>
        </Col>
        <Col span={2} />
      </Row>
      <div style={{ maxHeight: 200, overflow: 'scroll' }}>
        {medications.map(
          (medication) =>
            !medication.isDeleted && (
              <MedicationItem
                key={medication.id}
                medicationRow={medication}
                deleteMedication={deleteMedication}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default MedicationsList;
