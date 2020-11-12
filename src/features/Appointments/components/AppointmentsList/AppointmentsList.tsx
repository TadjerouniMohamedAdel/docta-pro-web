import React from 'react';
import { Col, Dropdown, Menu, Row } from 'antd';
import moment from 'moment';
import Avatar from 'antd/lib/avatar/avatar';
import './styles.less';
import Spacer from '../../../../components/Spacer/Spacer';
import Text from '../../../../components/Text/Text';
import Icon from '../../../../components/Icon/Icon';
import Button from '../../../../components/Button/Button';

export type Props = {
  currentDate: Date;
};

const AppointmentsList: React.FC<Props> = ({ currentDate }) => {
  console.log(currentDate);

  const appointments = [
    {
      id: 1,
      startDate: new Date(),
      picture: '',
      firstName: 'Jayden',
      lastName: 'Barnes',
      visitReason: 'General consultation',
    },
    {
      id: 2,
      startDate: new Date(),
      picture: '',
      firstName: 'Jayden',
      lastName: 'Barnes',
      visitReason: 'General consultation',
    },
    {
      id: 2,
      startDate: new Date(),
      picture: '',
      firstName: 'Jayden',
      lastName: 'Barnes',
      visitReason: 'General consultation',
    },
  ];

  return (
    <div>
      <Spacer size="xs" direction="vertical">
        {appointments.map((appointment) => (
          <Row key={appointment.id} gutter={16}>
            <Col>
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
                    <Avatar src={appointment.picture} size="large" />
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
                      <Icon name="more" style={{ fill: '#fff' }} size={24} type="fill" />
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
