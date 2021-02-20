import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useLocaleState } from '../../../i18n';
import './styles.less';
import Header from './Header/Header';
import TimeSlotWrapper from './TimeSlotWrapper/TimeSlotWrapper';
import { useAppointmentsWeekList } from '../hooks';

export type Props = {
  currentDate: Date;
};

const localizer = momentLocalizer(moment);

const min = new Date(0, 0, 0, 7, 0, 0);
const max = new Date(0, 0, 0, 21, 0, 0);

const WeekCalendar: React.FC<Props> = ({ currentDate }) => {
  const { resolvedData: appointments } = useAppointmentsWeekList(currentDate);

  const { locale } = useLocaleState();

  const handleViewChange = () => {};
  const handleNavigate = () => {};

  return (
    <Calendar
      className="week-calendar"
      culture={locale === 'ar' ? 'ar-tn' : locale}
      localizer={localizer}
      defaultDate={currentDate}
      date={currentDate}
      defaultView="week"
      view="week"
      selectable="ignoreEvents"
      onSelecting={() => false}
      rtl={locale === 'ar'}
      events={appointments ?? []}
      style={{ height: '100%' }}
      //   onRangeChange={handleRangeChange}
      //   onSelectEvent={handleSelectEvent}
      //   onSelectSlot={handleSelectSlot}
      //   onDrillDown={handleDrillDown}
      onNavigate={handleNavigate}
      onView={handleViewChange}
      length={6}
      step={5}
      timeslots={12}
      min={min}
      max={max}
      components={{
        toolbar: () => null,
        header: Header,
        timeSlotWrapper: TimeSlotWrapper,
      }}
    />
  );
};

export default WeekCalendar;
