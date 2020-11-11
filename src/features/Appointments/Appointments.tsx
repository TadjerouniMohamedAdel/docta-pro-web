import { Button, Col, Divider, Row } from 'antd';
import React, { useState } from 'react';
import moment from 'moment';
import InnerLayout, { InnerContent, InnerSidebar } from '../../components/InnerLayout';
import Calendar from './components/Calendar/Calendar';
import Text from '../../components/Text/Text';
import Icon from '../../components/Icon/Icon';

const Appointments: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [prevDate, setPrevDate] = useState<Date>(currentDate);
  const [nextDate, setNextDate] = useState<Date>(moment(currentDate).add(1, 'month').toDate());

  const onPrevDateChange = (date: Date): void => {
    if (date > prevDate && moment(date).month() !== moment(prevDate).month())
      setNextDate(moment(nextDate).add(1, 'month').toDate());
    else if (date < prevDate && moment(date).month() !== moment(prevDate).month())
      setNextDate(moment(nextDate).subtract(1, 'month').toDate());

    setPrevDate(date);
    setCurrentDate(date);
  };

  const onNextDateChange = (date: Date): void => {
    if (date > nextDate && moment(date).month() !== moment(nextDate).month())
      setPrevDate(moment(prevDate).add(1, 'month').toDate());
    else if (date < nextDate && moment(date).month() !== moment(nextDate).month())
      setPrevDate(moment(prevDate).subtract(1, 'month').toDate());

    setNextDate(date);
    setCurrentDate(date);
  };

  const changePanel = (action: string): void => {
    switch (action) {
      case 'next':
        setPrevDate(moment(prevDate).add(2, 'month').toDate());
        setNextDate(moment(nextDate).add(2, 'month').toDate());
        break;

      case 'prev':
        setPrevDate(moment(prevDate).subtract(2, 'month').toDate());
        setNextDate(moment(nextDate).subtract(2, 'month').toDate());
        break;

      default:
        break;
    }
  };

  return (
    <InnerLayout>
      <InnerSidebar>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div>
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
          </div>
          <div>
            <div>
              <Divider style={{ margin: 0 }} />
              <div>
                <Row style={{ height: 70 }} align="middle">
                  <Col flex={1}>
                    <Button
                      type="link"
                      style={{ margin: '0 auto', display: 'flex' }}
                      onClick={() => changePanel('prev')}
                    >
                      <Icon name="arrow-left-s" style={{ marginRight: 16 }} />
                      <Text size="md" style={{ fontWeight: 'bold' }}>
                        PREV
                      </Text>
                    </Button>
                  </Col>
                  <Col>
                    <Divider type="vertical" style={{ height: 70 }} />
                  </Col>
                  <Col flex={1}>
                    <Button
                      type="link"
                      style={{ margin: '0 auto', display: 'flex' }}
                      onClick={() => changePanel('next')}
                    >
                      <Text size="md" style={{ fontWeight: 'bold' }}>
                        NEXT
                      </Text>
                      <Icon name="arrow-right-s" style={{ marginLeft: 16 }} />
                    </Button>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </InnerSidebar>
      <InnerContent>inner content</InnerContent>
    </InnerLayout>
  );
};

export default Appointments;
