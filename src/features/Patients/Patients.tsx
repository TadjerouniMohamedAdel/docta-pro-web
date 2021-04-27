import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Spacer from '../../components/Spacer/Spacer';
import PatientsList from './PatientsList/PatientsList';
import PatientProfile from './PatientProfile/PatientProfile';
import PatientModal from './PatientModal/PatientModal';
import { SelectedPatient } from './types';
import ProtectedComponent from '../Auth/ProtectedComponent/ProtectedComponent';
import emptyStateImg from '../../assets/img/empty-state.png';

const Patients: React.FC = () => {
  const { t } = useTranslation('translation');
  const [patientsCount, setPatientsCount] = useState<number | undefined>();
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatient | undefined>();

  const [showPatientModal, setShowPatientModal] = useState<boolean>(false);

  const handleSetPatientCount = (value: number) => {
    setPatientsCount(value);
  };

  return (
    <InnerLayout>
      <InnerSidebar>
        <Row justify="space-between" style={{ padding: 13 }}>
          <Col style={{ display: 'flex' }}>
            <Spacer size="xs">
              <Text size="xxl" style={{ fontWeight: 'bold' }}>
                {t('patients')}
              </Text>
              <Text type="secondary" style={{ fontWeight: 500 }}>
                {patientsCount}
              </Text>
            </Spacer>
          </Col>
          <Col>
            <ProtectedComponent accessCode="add/patients">
              <Button type="primary" size="small" onClick={() => setShowPatientModal(true)}>
                <Icon name="add-line" />
              </Button>
            </ProtectedComponent>
          </Col>
        </Row>
        <PatientsList
          handleSetPatientCount={handleSetPatientCount}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
        />
      </InnerSidebar>
      <InnerContent style={{ display: 'flex', flexDirection: 'column' }}>
        {selectedPatient ? (
          <PatientProfile
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
          />
        ) : (
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spacer size="xl" direction="vertical" fullWidth={false} align="center">
              <img src={emptyStateImg} alt="empty state" />
              <Text type="secondary">{t('Select a patient to see their info here')}</Text>
            </Spacer>
          </div>
        )}
      </InnerContent>
      <ProtectedComponent accessCode="add/patients">
        <PatientModal visible={showPatientModal} setVisible={setShowPatientModal} />
      </ProtectedComponent>
    </InnerLayout>
  );
};

export default Patients;
