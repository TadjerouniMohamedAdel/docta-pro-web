import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Tab, Text, Icon, Button } from '../../../../components';
import WorkingHours from './WorkingHours/WorkingHours';
import DaysOff from './DaysOff/DaysOff';
import { WorkingHoursSchedule } from './types';
import { fetchWorkingHours, saveWorkingHours } from './services';

type Props = {};

const Schedule: React.FC<Props> = () => {
  const { t } = useTranslation('translation');
  const [activeKey, setActiveKey] = useState<string>('1');
  const [showDaysOffModal, setShowDaysOffModal] = useState<boolean>(false);
  const [workingHoursSchedule, setWorkingHoursSchedule] = useState<WorkingHoursSchedule[]>([]);

  const handleTabsChange = (value: string) => {
    setActiveKey(value);
  };

  const handleCloseDaysOffModal = () => {
    setShowDaysOffModal(false);
  };

  const handleUpdateWorkingHours = (values: WorkingHoursSchedule[]) => {
    setWorkingHoursSchedule(values);
  };

  const { mutate: saveWorkingHoursMutation, isLoading: isSaveWorkingHoursLoading } = useMutation(
    saveWorkingHours,
  );

  const handleSaveWorkingHours = () => {
    saveWorkingHoursMutation(workingHoursSchedule);
  };

  const getWorkingHours = async () => {
    try {
      const { data }: { data: WorkingHoursSchedule[] } = await fetchWorkingHours();
      setWorkingHoursSchedule(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAction = () => {
    switch (activeKey) {
      case '1':
        return (
          <Button
            type="primary"
            icon={<Icon name="save-line" />}
            size="small"
            onClick={() => handleSaveWorkingHours()}
            loading={isSaveWorkingHoursLoading}
          >
            {t('save')}
          </Button>
        );

      case '2':
        return (
          <Button
            type="primary"
            icon={<Icon name="add-line" />}
            size="small"
            onClick={() => setShowDaysOffModal(true)}
          >
            {t('add Days Off')}
          </Button>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    getWorkingHours();
  }, []);

  return (
    <>
      <div style={{ padding: '18px 25px' }}>
        <Row align="middle" gutter={16}>
          <Col flex={1}>
            <Text size="xxl" style={{ fontWeight: 'bold' }}>
              {t('Availability')}
            </Text>
          </Col>
          <Col>{getAction()}</Col>
        </Row>
      </div>
      <div style={{ flexGrow: 1 }}>
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          tabBarStyle={{ paddingLeft: 20, paddingRight: 20 }}
          onChange={handleTabsChange}
        >
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="time-line" />}> {t('Working Hours')} </Tab>}
            key="1"
          >
            <WorkingHours
              workingHoursSchedule={workingHoursSchedule}
              handleUpdateData={handleUpdateWorkingHours}
              spacing="24px 80px"
            />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Tab icon={<Icon name="hotel-bed-line" />}>{t('Days Off')}</Tab>}
            key="2"
          >
            <DaysOff showModal={showDaysOffModal} closeModal={handleCloseDaysOffModal} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Schedule;
