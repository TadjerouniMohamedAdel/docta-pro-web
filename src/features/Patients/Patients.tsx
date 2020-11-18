import { Col, Dropdown, Menu, Row, Tabs } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Text from '../../components/Text/Text';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Tab from '../../components/Tab/Tab';
import Spacer from '../../components/Spacer/Spacer';
import PatientsList from './components/PatientsList/PatientsList';
import BlockedPatientsList from './components/BlockedPatientsList/BlockedPatientsList';
import PatientProfile from './components/PatientProfile/PatientProfile';

const Patients: React.FC = () => {
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
            <Button type="primary" size="small">
              <Icon name="add" />
            </Button>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: 16, paddingRight: 16 }} size="small">
          <Tabs.TabPane tab={<Tab>All Patients</Tab>} key="1">
            <PatientsList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Blocked Patients" key="2">
            <BlockedPatientsList />
          </Tabs.TabPane>
        </Tabs>
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
                icon={<Icon name="chat-2" />}
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
                  <Icon name="more-2" size={24} type="fill" />
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </div>
        <div style={{ flexGrow: 1 }}>
          <PatientProfile />
        </div>
      </InnerContent>
    </InnerLayout>
  );
};

export default Patients;
