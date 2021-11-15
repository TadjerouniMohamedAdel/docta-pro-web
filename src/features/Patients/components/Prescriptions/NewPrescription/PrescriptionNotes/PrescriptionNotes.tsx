import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TextArea, Text, Icon } from '../../../../../../components';

type Props = {
  note: string;
  setNote: (note: string) => void;
};

const PrescriptionNotes: React.FC<Props> = ({ note, setNote }) => {
  const { t } = useTranslation();

  return (
    <Row
      justify="space-between"
      align="middle"
      gutter={[0, 8]}
      style={{ padding: '20px 40px 30px' }}
    >
      <Col span={24}>
        <Text size="lg">{t('notes')}</Text>
      </Col>
      <Col span={24}>
        <TextArea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          icon={<Icon name="24-hours-line" />}
          style={{ color: '#74798C' }}
        />
      </Col>
    </Row>
  );
};

export default PrescriptionNotes;
