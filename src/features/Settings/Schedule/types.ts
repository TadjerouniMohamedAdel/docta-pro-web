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
