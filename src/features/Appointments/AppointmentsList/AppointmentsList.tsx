import React from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';
import './styles.less';
import Spacer from '../../../components/Spacer/Spacer';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Button from '../../../components/Button/Button';
import { Appointment } from '../types';
import { useAppointmentsDayList } from '../hooks';

export type Props = {
  currentDate: Date;
};

const AppointmentsList: React.FC<Props> = ({ currentDate }) => {
  const { resolvedData: appointments } = useAppointmentsDayList(currentDate);

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
                className="appointment-card"
                style={{ height: 72, borderRadius: 8, padding: '0 16px' }}
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
                  <Col className="appointment-action">
                    <Button size="small">Start Appointment</Button>
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
