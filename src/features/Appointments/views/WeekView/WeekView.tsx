import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './styles.less';
import Header from './Header/Header';
import TimeSlotWrapper from './TimeSlotWrapper/TimeSlotWrapper';
import { useAppointmentsWeekList } from '../../hooks';
import Event from './Event/Event';
import EventWrapper from './EventWrapper/EventWrapper';
import { AppointmentForm } from '../../types';

export type Props = {
  currentDate: Date;
  visitReasonIds: string[];
  appointmentForm: AppointmentForm;
  setAddAppointmentForm: (appointmentForm: AppointmentForm) => void;
  setShowAppointmentAdd: (visible: boolean) => void;
  setShowAppointmentDetails: (visible: boolean) => void;
  setAppointmentDetailsId: (appointmentId: string) => void;
  setPatientId: (patientId: string) => void;
};

const localizer = momentLocalizer(moment);

// const min = new Date(0, 0, 0, 7, 0, 0);
// const max = new Date(0, 0, 0, 21, 0, 0);

type SlotInfo = {
  start: string | Date;
  end: string | Date;
  slots: Date[] | string[];
  action: 'select' | 'click' | 'doubleClick';
};

const WeekView: React.FC<Props> = ({
  currentDate,
  visitReasonIds,
  appointmentForm,
  setAddAppointmentForm,
  setShowAppointmentAdd,
  setShowAppointmentDetails,
  setAppointmentDetailsId,
  setPatientId,
}) => {
  const { resolvedData: appointments, refetch } = useAppointmentsWeekList(
    currentDate,
    visitReasonIds,
  );

  const { i18n } = useTranslation();

  const handleViewChange = () => {};
  const handleNavigate = () => {};

  const handleSelectSlot = ({ start }: SlotInfo) => {
    setAddAppointmentForm({
      ...appointmentForm,
      start: start as Date,
      time: start as Date,
    });
    setShowAppointmentAdd(true);
  };

  const handleSelectEvent = (values: any) => {
    setAppointmentDetailsId(values.id);
    setPatientId(values.patient.id);
    setShowAppointmentDetails(true);
  };

  useEffect(() => {
    refetch();
  }, [visitReasonIds]);

  return (
    <Calendar
      className="week-calendar"
      culture={i18n.language === 'ar' ? 'ar-tn' : i18n.language}
      localizer={localizer}
      defaultDate={currentDate}
      date={currentDate}
      defaultView="week"
      view="week"
      selectable="ignoreEvents"
      onSelecting={() => false}
      rtl={i18n.language === 'ar'}
      events={appointments ?? []}
      style={{ height: '100%' }}
      //   onRangeChange={handleRangeChange}
      //   onDrillDown={handleDrillDown}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      onNavigate={handleNavigate}
      onView={handleViewChange}
      length={6}
      step={5}
      timeslots={12}
      // min={min}
      // max={max}
      components={{
        toolbar: () => null,
        header: Header,
        timeSlotWrapper: TimeSlotWrapper,
        event: Event,
        eventWrapper: EventWrapper,
      }}
    />
  );
};

export default WeekView;
