import { Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { PrescriptionDetails, PrescriptionForm } from '../../types';
import AddPrescriptionButton from './AddPrescriptionButton/AddPrescriptionButton';
import PrescriptionsList from './PrescriptionsList/PrescriptionsList';

type Props = {
  patientId: string;
  prescriptionId: string;
  setContentType: (contentType: string) => void;
  setPrescriptionInitialValues: (initialValues: PrescriptionForm) => void;
  setSelectedPrescriptionId?: (id: string) => void;
};

const Prescriptions: React.FC<Props> = ({
  patientId,
  prescriptionId,
  setContentType,
  setPrescriptionInitialValues,
  setSelectedPrescriptionId,
}) => {
  const { t } = useTranslation(['translation', 'errors', 'placeholders']);

  const handleAddPrescription = () => {
    setPrescriptionInitialValues({
      diagnostic: '',
      note: '',
      medications: [],
    });
    setContentType('new-prescription');
  };

  const prescribeAgain = (prescription: PrescriptionDetails) => {
    setPrescriptionInitialValues(prescription);
    setContentType('new-prescription');
  };

  return (
    <div className="prescriptions">
      <div style={{ padding: '30px 40px' }}>
        <Row gutter={20}>
          <Col span={24}>
            <AddPrescriptionButton
              title={t('new blank prescription')}
              onClick={handleAddPrescription}
            />
          </Col>
          {/* <Col span={12}>
            <AddPrescriptionButton title={t('new form template')} />
          </Col> */}
        </Row>
      </div>
      <PrescriptionsList
        patientId={patientId}
        selectedPrescriptionId={prescriptionId}
        goToEditPrescription={() => setContentType('edit-prescription')}
        setSelectedPrescriptionId={setSelectedPrescriptionId}
        prescribeAgain={prescribeAgain}
      />
    </div>
  );
};

export default Prescriptions;
