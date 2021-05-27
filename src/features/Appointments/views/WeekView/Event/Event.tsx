import React from 'react';
import { EventProps } from 'react-big-calendar';
import moment from 'moment';
import { Text } from '../../../../../components';

const Event: React.FC<EventProps> = ({ event, title }) => {
  const { start } = event;
  return (
    <Text size="xs" style={{ fontWeight: 500 }}>
      {moment(start).format('LT')} {title}
    </Text>
  );
};

export default Event;
