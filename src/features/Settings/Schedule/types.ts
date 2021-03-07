export type WorkingHoursSchedule = {
  id: string;
  dayOfWeek: number;
  morningStart: string | null;
  morningEnd: string | null;
  afternoonStart: string | null;
  afternoonEnd: string | null;
  isOpen: boolean;
  isEdited?: boolean;
};

export type DaysOffSchedule = {
  id?: string;
  from: Date;
  to: Date;
  canceledAppointments?: number;
  message?: string;
};

export type DaysOffParams = {
  from: Date | null;
  to: Date | null;
  message?: string;
};
