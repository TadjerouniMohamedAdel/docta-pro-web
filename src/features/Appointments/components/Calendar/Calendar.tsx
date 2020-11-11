import React from 'react';
import { Calendar as AntCalendar, Col, Row } from 'antd';
import moment from 'moment';
import Text from '../../../../components/Text/Text';
import './styles.less';

export type Props = {
  appointmentsCount: number;
  date: Date;
  currentDate: Date;
  onSelectDate: (value: Date) => void;
};

const Spacer: React.FC<Props> = ({ appointmentsCount, date, onSelectDate, currentDate }) => {
  return (
    <div className={`${currentDate === date ? '' : 'inactive-calendar'}`}>
      <AntCalendar
        defaultValue={moment(date)}
        value={moment(date)}
        fullscreen={false}
        onSelect={(value) => onSelectDate(value.toDate())}
        headerRender={() => (
          <Row justify="space-between" style={{ padding: '28px 16px' }}>
            <Col>
              <Text size="lg" style={{ fontWeight: 'bold' }}>
                {moment(date).format('MMMM YYYY')}
              </Text>
            </Col>
            <Col>
              <Text className="appointment-count">{appointmentsCount} Appointments</Text>
            </Col>
          </Row>
        )}
      />
    </div>
  );
};

export default Spacer;
