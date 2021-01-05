import React from 'react';
import { Col, Row, Avatar, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/Button/Button';
import Text from '../../../components/Text/Text';
import Icon from '../../../components/Icon/Icon';
import Tab from '../../../components/Tab/Tab';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import CabinetInfo from './CabinetInfo/CabinetInfo';

type Props = {};

const DoctorProfile: React.FC<Props> = () => {
  const { t } = useTranslation('translation');

  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Row align="middle" gutter={16}>
          <Col>
            <Avatar src="" size={54} />
          </Col>
          <Col flex={1}>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              Dr.Mahmud Abu Hasan
            </Text>
            <br />
            <Text type="secondary" style={{ fontWeight: 500 }}>
              Cardiologist - Residence El Khelil N 41, Said Hamdine, Alger
            </Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<Icon name="save-line" />}
              size="small"
              //   onClick={handleSavePatient}
              //   loading={isLoading}
            >
              {t('save')}
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="profile-line" />}> {t('personal info')} </Tab>}
            key="1"
          >
            <PersonalInfo />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="health-book-line" />}>{t('cabinet info')}</Tab>}
            key="2"
          >
            <CabinetInfo />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="history-line" />}>{t('visit reasons')}</Tab>}
            key="3"
          >
            visit reasons
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default DoctorProfile;
