import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AddPrescriptionButton from '../AddPrescriptionButton/AddPrescriptionButton';

type Props = {};

const Prescriptions: React.FC<Props> = () => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  return (
    <div style={{ padding: '30px 40px' }}>
      <Row gutter={20}>
        <Col span={12}>
          <AddPrescriptionButton title={t('new blank prescription')} />
        </Col>
        <Col span={12}>
          <AddPrescriptionButton title={t('new form template')} />
        </Col>
      </Row>
    </div>
  );
};

export default Prescriptions;
