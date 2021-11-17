import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppointmentModalContentTypes } from '../../types';
import AddPrescriptionButton from './AddPrescriptionButton/AddPrescriptionButton';
import PrescriptionsList from './PrescriptionsList/PrescriptionsList';

type Props = {
  patientId: string;
  prescriptionId: string;
  setContentType: (contentType: AppointmentModalContentTypes) => void;
  setSelectedPrescriptionId: (id: string) => void;
};

const Prescriptions: React.FC<Props> = ({
  patientId,
  prescriptionId,
  setContentType,
  setSelectedPrescriptionId,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  return (
    <div className="prescriptions">
      <div style={{ padding: '30px 40px' }}>
        <Row gutter={20}>
          <Col span={24}>
            <AddPrescriptionButton
              title={t('new blank prescription')}
              onClick={() => setContentType('new-prescription')}
            />
          </Col>
          {/* <Col span={12}>
            <AddPrescriptionButton title={t('new form template')} />
          </Col> */}
        </Row>
      </div>
      <PrescriptionsList
        patientId={patientId}
        prescriptionId={prescriptionId}
        goToEditPrescription={() => setContentType('edit-prescription')}
        setSelectedPrescriptionId={setSelectedPrescriptionId}
      />
    </div>
  );
};

export default Prescriptions;
