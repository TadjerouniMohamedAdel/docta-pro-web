import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Icon, Text } from '../../../../../components';
import { MedicationRow } from '../../../types';
import MedicationItem from './MedicationItem/MedicationItem';

type Props = {
  medications: MedicationRow[];
  deleteMedication: (id: string) => void;
};

const MedicationsList: React.FC<Props> = ({ medications, deleteMedication }) => {
  const { t } = useTranslation();

  return (
    <div style={{ padding: '40px 0 24px' }}>
      {/* section header */}
      <Row justify="space-between" align="middle" style={{ padding: '0 40px 20px' }}>
        <Col>
          <Text>{t('prescription')}</Text>
        </Col>
        <Col>
          <Row>
            <Col>
              <Button type="link" icon={<Icon name="serach-eye-line" />}>
                {t('preview')}
              </Button>
            </Col>
            <Col>
              <Button type="link" icon={<Icon name="printer-line" />}>
                {t('print')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* list header row */}
      <Row align="middle" style={{ padding: '0 18px' }}>
        <Col span={2} />
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
        <Col span={6}>
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
      {medications.map((medication) => (
        <MedicationItem
          key={medication.id}
          medicationRow={medication}
          deleteMedication={deleteMedication}
        />
      ))}
    </div>
  );
};

export default MedicationsList;
