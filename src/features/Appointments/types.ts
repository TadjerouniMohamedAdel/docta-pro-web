export type AppointmentForm = {
  id?: string;
  patientId: string;
  start: Date | null;
  time: Date | null;
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
  picture?: string;
};
