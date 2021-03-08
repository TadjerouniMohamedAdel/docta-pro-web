import React, { useEffect } from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import './styles.less';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';
import { Appointment } from '../types';
import { useAppointmentsDayList } from '../hooks';

export type Props = {
  currentDate: Date;
  visitReasonIds: string[];
  setShowAppointmentDetailsModal: (visible: boolean) => void;
  setShowStartAppointmentModal: (visible: boolean) => void;
  setAppointmentDetailsId: (appointmentId: string) => void;
};

const AppointmentsList: React.FC<Props> = ({
  currentDate,
  visitReasonIds,
  setShowStartAppointmentModal,
  setAppointmentDetailsId,
  // setShowAppointmentDetailsModal,
}) => {
  const { t } = useTranslation('translation');

  const { resolvedData: appointments, refetch } = useAppointmentsDayList(
    currentDate,
    visitReasonIds,
  );

  // const handleSelectAppointment = (appointmentId: string) => {
  //   setAppointmentDetailsId(appointmentId);
  //   setShowAppointmentDetailsModal(true);
  // };

  const handleStartAppointment = (appointmentId: string) => {
    setAppointmentDetailsId(appointmentId);
    setShowStartAppointmentModal(true);
  };

  useEffect(() => {
    refetch();
  }, [visitReasonIds]);

  return (
    <div>
      <Spacer size="xs" direction="vertical">
        {appointments.map((appointment: Appointment) => (
          <Row key={appointment.id} gutter={16}>
            <Col style={{ minWidth: 70 }}>
              <Text size="sm" style={{ fontWeight: 'bold' }}>
                {moment(appointment.startDate).format('LT')}
              </Text>
            </Col>
            <Col flex={1}>
              <div
                className={classnames('appointment-card', {
                  absent: appointment.status === 'PATIENT_MISSED',
                  done: appointment.status === 'DONE',
                })}
                style={{ height: 72, borderRadius: 8, padding: '0 16px' }}
                // onClick={() => handleSelectAppointment(appointment.id)}
                // onKeyPress={() => handleSelectAppointment(appointment.id)}
                // role="button"
                // tabIndex={0}
              >
                <Row style={{ height: '100%' }} align="middle" gutter={16}>
                  <Col>
                    {appointment.picture ? (
                      <Avatar src={appointment.picture} size="large" />
                    ) : (
                      <Avatar src={appointment.picture} size="large">
                        {appointment.firstName[0]?.toUpperCase()}
                        {appointment.lastName[0]?.toUpperCase()}
                      </Avatar>
                    )}
                  </Col>
                  <Col flex={1}>
                    <Row gutter={4}>
                      <Col>
                        <Text style={{ fontWeight: 500 }}>
                          {appointment.firstName} {appointment.lastName}
                        </Text>
                      </Col>
                      <Col>
                        <Text style={{ fontWeight: 500 }}>-</Text>
                      </Col>
                      <Col>
                        <Text style={{ fontWeight: 500 }}>{appointment.visitReason}</Text>
                      </Col>
                    </Row>
                  </Col>
                  {appointment.status === 'BOOKED' ? (
                    <>
                      <Col className="appointment-action">
                        <Button size="small" onClick={() => handleStartAppointment(appointment.id)}>
                          {t('start appointment')}
                        </Button>
                      </Col>
                      <Col className="appointment-action">
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item> more actions</Menu.Item>
                            </Menu>
                          }
                          trigger={['click']}
                        >
                          <Button type="text">
                            <Icon name="more-fill" size={24} style={{ color: '#fff' }} />
                          </Button>
                        </Dropdown>
                      </Col>
                    </>
                  ) : null}
                  {appointment.status === 'DONE' ? (
                    <Col className="appointment-status appointment-done">
                      <Text style={{ fontWeight: 500, textTransform: 'uppercase' }}>
                        {t('done')}
                      </Text>
                    </Col>
                  ) : null}
                  {appointment.status === 'PATIENT_MISSED' ? (
                    <Col className="appointment-status appointment-absent">
                      <Text style={{ fontWeight: 500, textTransform: 'uppercase' }}>
                        {t('absent')}
                      </Text>
                    </Col>
                  ) : null}
                </Row>
              </div>
            </Col>
          </Row>
        ))}
      </Spacer>
    </div>
  );
};

export default AppointmentsList;
