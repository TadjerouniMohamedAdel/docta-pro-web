import { Button, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Calendar from './components/Calendar/Calendar';
import Text from '../../components/Text/Text';

const Appointments: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [prevDate, setPrevDate] = useState<Date>(currentDate);
  const [nextDate, setNextDate] = useState<Date>(moment(currentDate).add(1, 'month').toDate());

  const onPrevDateChange = (date: Date): void => {
    setPrevDate(date);
    setCurrentDate(date);
  };

  const onNextDateChange = (date: Date): void => {
    setNextDate(date);
    setCurrentDate(date);
  };

  return (
    <InnerLayout>
      <InnerSidebar>
        <div style={{ padding: '18px 24px 13px 24px' }}>
          <Text size="xl" style={{ fontWeight: 'bold' }}>
            Appointments
          </Text>
        </div>
        <Divider style={{ margin: 0 }} />
        <Calendar
          appointmentsCount={17}
          date={prevDate}
          onSelectDate={onPrevDateChange}
          currentDate={currentDate}
        />
        <Divider style={{ margin: 0 }} />
        <Calendar
          appointmentsCount={67}
          date={nextDate}
          onSelectDate={onNextDateChange}
          currentDate={currentDate}
        />
        <div>
          <Divider style={{ margin: 0 }} />
          <div>
            <Row style={{ height: 70 }} align="middle">
              <Col flex={1}>
                <Button type="link" style={{ margin: '0 auto', display: 'block' }}>
                  <Text size="md" style={{ fontWeight: 'bold' }}>
                    PREV
                  </Text>
                </Button>
              </Col>
              <Col>
                <Divider type="vertical" style={{ height: 70 }} />
              </Col>
              <Col flex={1}>
                <Button type="link" style={{ margin: '0 auto', display: 'block' }}>
                  <Text size="md" style={{ fontWeight: 'bold' }}>
                    NEXT
                  </Text>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </InnerSidebar>
      <InnerContent>inner content</InnerContent>
    </InnerLayout>
  );
};

export default Appointments;
