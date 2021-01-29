export type WorkingHoursSchedule = {
  id: string;
  dayOfWeek: number;
  morningStart: string;
  morningEnd: string;
  afternoonStart: string;
  afternoonEnd: string;
  isOpen: boolean;
  isEdited?: boolean;
};
