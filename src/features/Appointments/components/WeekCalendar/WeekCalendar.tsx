import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useLocaleState } from '../../../../components/Layout/components/Header/components/Localization';
import './styles.less';

export type Props = {
  currentDate: Date;
};

const localizer = momentLocalizer(moment);

const WeekCalendar: React.FC<Props> = ({ currentDate }) => {
  const appointments: any = [];
  const { locale } = useLocaleState();

  return (
    <Calendar
      culture={locale === 'ar' ? 'ar-tn' : locale}
      localizer={localizer}
      defaultDate={currentDate}
      date={currentDate}
      defaultView="week"
      view="week"
      selectable="ignoreEvents"
      onSelecting={() => false}
      rtl={locale === 'ar'}
      events={appointments}
      style={{ height: '100%' }}
      //   onNavigate={handleNavigate}
      //   onRangeChange={handleRangeChange}
      //   onSelectEvent={handleSelectEvent}
      //   onSelectSlot={handleSelectSlot}
      //   onDrillDown={handleDrillDown}
      length={6}
      step={5}
      timeslots={12}
      components={{
        toolbar: () => null,
      }}
    />
  );
};

export default WeekCalendar;
