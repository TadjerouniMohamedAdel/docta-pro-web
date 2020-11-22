import { Col, Dropdown, Menu, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useState } from 'react';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Spacer from '../../components/Spacer/Spacer';
import PatientsList from './PatientsList/PatientsList';
import PatientProfile from './PatientProfile/PatientProfile';
import PatientModal from './PatientModal/PatientModal';

const Patients: React.FC = () => {
  const [showPatientModal, setShowPatientModal] = useState(false);

  return (
    <InnerLayout>
      <InnerSidebar>
        <Row justify="space-between" style={{ padding: 13 }}>
          <Col style={{ display: 'flex' }}>
            <Spacer size="xs">
              <Text size="xxl" style={{ fontWeight: 'bold' }}>
                Patients
              </Text>
              <Text type="secondary" style={{ fontWeight: 500 }}>
                465
              </Text>
            </Spacer>
          </Col>
          <Col>
            <Button type="primary" size="small" onClick={() => setShowPatientModal(true)}>
              <Icon name="add-line" />
            </Button>
          </Col>
        </Row>
        <PatientsList />
      </InnerSidebar>
      <InnerContent style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 25px' }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar src="" size={54} />
            </Col>
            <Col flex={1}>
              <Text size="xxl" style={{ fontWeight: 'bold' }}>
                Pauline Nunez
              </Text>
              <br />
              <Text type="secondary" style={{ fontWeight: 500 }}>
                Coronary atherosclerosis - Latest diagnosis
              </Text>
            </Col>
            <Col>
              <Button
                ghost
                type="primary"
                icon={<Icon name="chat-2-line" />}
                style={{ display: 'flex' }}
                size="small"
              >
                Message
              </Button>
            </Col>
            <Col>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item> more actions</Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <Button type="default" size="small">
                  <Icon name="more-2-fill" size={24} />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <div style={{ flexGrow: 1 }}>
          <PatientProfile />
        </div>
      </InnerContent>
      <PatientModal visible={showPatientModal} setVisible={setShowPatientModal} />
    </InnerLayout>
  );
};

export default Patients;
