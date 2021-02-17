export type AppointmentForm = {
  patientId: '';
  start: Date | null;
  time: string;
  reasonId: string;
  duration: number | undefined;
};

export type Appointment = {
  id: string;
  startDate: Date;
  picture: string;
  firstName: string;
  lastName: string;
  visitReason: string;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender?: string;
  state?: string;
  city?: string;
  generalStatus: string;
};
