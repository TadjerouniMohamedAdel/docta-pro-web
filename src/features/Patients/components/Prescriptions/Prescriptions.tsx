import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppointmentModalContentTypes } from '../../../Appointments/types';
import AddPrescriptionButton from './AddPrescriptionButton/AddPrescriptionButton';
import PrescriptionsList from './PrescriptionsList/PrescriptionsList';

type Props = {
  patientId: string;
  setContentType: (contentType: AppointmentModalContentTypes) => void;
};

const Prescriptions: React.FC<Props> = ({ patientId, setContentType }) => {
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
        goToEditPrescription={() => setContentType('prescriptions')}
      />
    </div>
  );
};

export default Prescriptions;
