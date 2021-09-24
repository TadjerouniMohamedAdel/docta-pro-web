import { Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import classNames from 'classnames';
import { Spacer, Text } from '../../../../../components';
import { SelectedPatient } from '../../../types';

type Props = {
  patient: SelectedPatient;
  selectedPatient?: SelectedPatient;
  handleGetPatientDetails: (values: SelectedPatient) => void;
};

const PatientItem: React.FC<Props> = ({ patient, selectedPatient, handleGetPatientDetails }) => {
  return (
    <div
      key={patient.id}
      className={classNames('patient-box', {
        selected: patient.id === selectedPatient?.id,
      })}
      onClick={() => handleGetPatientDetails(patient)}
      onKeyPress={() => handleGetPatientDetails(patient)}
      role="button"
      tabIndex={0}
    >
      <Row justify="space-between" gutter={12} style={{ padding: '12px' }}>
        <Col>
          <Row gutter={12} align="middle">
            <Col>
              {patient.picture ? (
                <Avatar src={patient.picture} size="large" />
              ) : (
                <Avatar src={patient.picture} size="large">
                  {patient.firstName[0]?.toUpperCase()}
                  {patient.lastName[0]?.toUpperCase()}
                </Avatar>
              )}
            </Col>
            <Col>
              <Spacer size="xss" direction="vertical">
                <Text style={{ fontWeight: 'bold' }}>
                  {patient.firstName} {patient.lastName}
                </Text>
                <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
                  {patient.city?.name ?? '-'} - {patient.state?.name ?? '-'}
                </Text>
              </Spacer>
            </Col>
          </Row>
        </Col>
        <Col>
          <Text style={{ fontWeight: 500 }} type="secondary" size="sm">
            {patient.user.phone}
          </Text>
        </Col>
      </Row>
    </div>
  );
};

export default PatientItem;
