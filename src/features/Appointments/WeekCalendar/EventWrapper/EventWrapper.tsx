import React from 'react';
import { EventWrapperProps } from 'react-big-calendar';
import classnames from 'classnames';

const EventWrapper: React.FC<EventWrapperProps> = ({ event, children }) => {
  const { reason } = event as any;

  return <div className={classnames('event-wrapper default-color', reason.color)}>{children}</div>;
};

export default EventWrapper;
