export type AppointmentStatus =
  | 'BOOKED'
  | 'CONFIRMED'
  | 'PATIENT_CANCELED'
  | 'DOCTOR_CANCELED'
  | 'DOCTOR_REJECTED'
  | 'DOCTOR_MISSED'
  | 'PATIENT_MISSED'
  | 'DONE';

export type AppointmentForm = {
  id?: string;
  patientId: string;
  start: Date | null;
  time: Date | string | null;
  reasonId: string;
  duration: number | undefined;
};

export type Appointment = {
  id: string;
  startDate: Date;
  picture: string;
  firstName: string;
  lastName: string;
  reason: {
    id:string;
    name:string;
    nameAr:string;
    nameFr:string;
  };
  visitReason: string;
  status: AppointmentStatus;
  patient: Patient;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  phone: string;
  birthDate: string;
  gender?: string;
  state?: string;
  city?: string;
  generalStatus: string;
  picture?: string;
};

export type PatientRelative = Pick<Patient, 'id' | 'firstName' | 'lastName' | 'picture'> & {
  relation?: string;
};
