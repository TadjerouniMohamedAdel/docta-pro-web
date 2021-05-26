import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Spacer from '../../components/Spacer/Spacer';
import PatientsList from './views/PatientsList/PatientsList';
import PatientProfile from './views/PatientProfile/PatientProfile';
import AddPatient from './views/AddPatient/AddPatient';
import { SelectedPatient } from './types';
import { ProtectedComponent } from '../Auth';
import emptyStateImg from '../../assets/img/empty-state.png';
import './styles.less';

const Patients: React.FC = () => {
  const { t } = useTranslation('translation');
  const [patientsCount, setPatientsCount] = useState<number | undefined>();
  const [selectedPatient, setSelectedPatient] = useState<SelectedPatient | undefined>();

  const [showAddPatient, setShowAddPatient] = useState<boolean>(false);

  const handleSetPatientCount = (value: number) => {
    setPatientsCount(value);
  };

  return (
    <InnerLayout className="patient-layout">
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
              <Button type="primary" size="small" onClick={() => setShowAddPatient(true)}>
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
        <AddPatient visible={showAddPatient} setVisible={setShowAddPatient} />
      </ProtectedComponent>
    </InnerLayout>
  );
};

export default Patients;
