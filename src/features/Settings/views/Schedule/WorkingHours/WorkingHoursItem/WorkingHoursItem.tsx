import { Col, Row, Switch } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, Icon } from '../../../../../../components';
import { WorkingHoursSchedule } from '../../types';
import HoursSelector from './HoursSelector/HoursSelector';

type Props = {
  workingHourDetails: WorkingHoursSchedule;
  handleUpdateData: (day: number, data: WorkingHoursSchedule) => void;
};

const WorkingHoursItem: React.FC<Props> = ({ workingHourDetails, handleUpdateData }) => {
  const { t } = useTranslation('translation');

  const days = [
    t('sunday'),
    t('monday'),
    t('tuesday'),
    t('wednesday'),
    t('thursday'),
    t('friday'),
    t('saturday'),
  ];

  const handleChange = (
    key: 'isOpen' | 'morningStart' | 'morningEnd' | 'afternoonStart' | 'afternoonEnd',
    value: never,
  ) => {
    const workingHourDetailsUpdated: WorkingHoursSchedule = { ...workingHourDetails };
    workingHourDetailsUpdated[key] = value;
    workingHourDetailsUpdated.isEdited = true;
    handleUpdateData(workingHourDetailsUpdated.dayOfWeek, workingHourDetailsUpdated);
  };

  const handleToggleMorningHours = (action: 'add' | 'remove', type: 'morning' | 'afternoon') => {
    const workingHourDetailsUpdated: WorkingHoursSchedule = { ...workingHourDetails };

    if (type === 'morning') {
      if (action === 'add') {
        workingHourDetailsUpdated.morningStart = '08:00';
        workingHourDetailsUpdated.morningEnd = '12:00';
      } else {
        workingHourDetailsUpdated.morningStart = null;
        workingHourDetailsUpdated.morningEnd = null;
      }
    } else if (action === 'add') {
      workingHourDetailsUpdated.afternoonStart = '13:00';
      workingHourDetailsUpdated.afternoonEnd = '17:00';
    } else {
      workingHourDetailsUpdated.afternoonStart = null;
      workingHourDetailsUpdated.afternoonEnd = null;
    }

    workingHourDetailsUpdated.isEdited = true;
    handleUpdateData(workingHourDetailsUpdated.dayOfWeek, workingHourDetailsUpdated);
  };

  return (
    <Row style={{ width: '100%' }} gutter={24}>
      <Col span={4}>
        <div style={{ marginBottom: 16 }}>
          <Text size="lg" style={{ fontWeight: 500 }}>
            {days[workingHourDetails.dayOfWeek]}
          </Text>
        </div>
        <Row gutter={16}>
          <Col>
            <Switch
              onChange={(checked) => {
                handleChange('isOpen', checked as never);
              }}
              checked={workingHourDetails.isOpen}
            />
          </Col>
          <Col>
            {workingHourDetails.isOpen ? (
              <Text style={{ fontWeight: 500 }}>{t('open')}</Text>
            ) : (
              <Text style={{ fontWeight: 500 }} type="secondary">
                {t('closed')}
              </Text>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={20}>
        {workingHourDetails.isOpen ? (
          <>
            <Row style={{ width: '100%' }} gutter={16} align="middle">
              {!workingHourDetails.morningStart || !workingHourDetails.morningEnd ? (
                <Col span={10}>
                  <div>
                    <Button
                      type="ghost"
                      size="small"
                      icon={<Icon name="add-circle-fill" size={18} />}
                      className="btn-record"
                      style={{ marginBottom: 4 }}
                      onClick={() => handleToggleMorningHours('add', 'morning')}
                    >
                      {t('Add morning hours')}
                    </Button>
                  </div>
                </Col>
              ) : (
                <>
                  <Col span={10}>
                    <div style={{ marginBottom: 4 }}>
                      <Text style={{ marginBottom: 4 }}>{t('Morning starts at')}</Text>
                      <HoursSelector
                        type="morning"
                        time={workingHourDetails.morningStart}
                        onChange={(value) => handleChange('morningStart', value as never)}
                      />
                    </div>
                  </Col>
                  <Col span={10}>
                    <div style={{ marginBottom: 4 }}>
                      <Text style={{ marginBottom: 4 }}>{t('Morning ends at')}</Text>
                      <HoursSelector
                        type="morning"
                        time={workingHourDetails.morningEnd}
                        onChange={(value) => handleChange('morningEnd', value as never)}
                      />
                    </div>
                  </Col>
                  <Col span={4}>
                    <Button
                      type="text"
                      className="btn-record-delete"
                      danger
                      size="small"
                      style={{ marginTop: 18 }}
                      onClick={() => handleToggleMorningHours('remove', 'morning')}
                    >
                      <Icon name="close-circle-line" size={18} />
                    </Button>
                  </Col>
                </>
              )}
            </Row>
            <Row style={{ width: '100%' }} gutter={16} align="middle">
              {!workingHourDetails.afternoonStart || !workingHourDetails.afternoonEnd ? (
                <Col span={10}>
                  <div>
                    <Button
                      type="ghost"
                      size="small"
                      icon={<Icon name="add-circle-fill" size={18} />}
                      className="btn-record"
                      onClick={() => handleToggleMorningHours('add', 'afternoon')}
                    >
                      {t('Add afternoon hours')}
                    </Button>
                  </div>
                </Col>
              ) : (
                <>
                  <Col span={10}>
                    <div style={{ marginBottom: 4 }}>
                      <Text>{t('Afternoon starts at')}</Text>
                      <HoursSelector
                        type="afternoon"
                        time={workingHourDetails.afternoonStart}
                        onChange={(value) => handleChange('afternoonStart', value as never)}
                      />
                    </div>
                  </Col>
                  <Col span={10}>
                    <div style={{ marginBottom: 4 }}>
                      <Text>{t('Afternoon ends at')}</Text>
                      <HoursSelector
                        type="afternoon"
                        time={workingHourDetails.afternoonEnd}
                        onChange={(value) => handleChange('afternoonEnd', value as never)}
                      />
                    </div>
                  </Col>
                  <Col span={4}>
                    <Button
                      type="text"
                      className="btn-record-delete"
                      danger
                      size="small"
                      style={{ marginTop: 18 }}
                      onClick={() => handleToggleMorningHours('remove', 'afternoon')}
                    >
                      <Icon name="close-circle-line" size={18} />
                    </Button>
                  </Col>
                </>
              )}
            </Row>
          </>
        ) : null}
      </Col>
    </Row>
  );
};

export default WorkingHoursItem;
