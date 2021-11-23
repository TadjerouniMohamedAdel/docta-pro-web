import { StateCity } from '../../common/types';
import { Specialty } from '../Settings/views/VisitReasons/types';

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
    id: string;
    name: string;
    nameAr: string;
    nameFr: string;
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

// Medication
export const units = [
  'Comprimés',
  'Goutes',
  'Cuillères à mesure',
  'Sachets',
  'ml',
  'kg',
  'Injections',
  'Applications',
] as const;

export const frequencyCounts = ['Une fois', 'Deux fois', 'Trois fois', 'Quatre fois'] as const;

export const frequencyPerDays = [
  'Chaque 8 heures',
  'Par jour',
  'Chaque deux jours',
  'Chaque trois jours',
  'Par semaine',
  'Par mois',
  'Par 3 mois',
] as const;

export const frequencyTimes = [
  'Avant repas',
  'Au milieux du repas',
  'Apres repas',
  'A jeun',
  'Le matin',
  'Le soir',
  'En cas de douleur',
  'En cas de fievre',
  'En cas de nausee',
  'En cas de vertige',
  '-',
] as const;

export const durationTypes = ['Jours', 'Semaines', 'Mois'] as const;
export type DurationTypes = typeof durationTypes[number];

export type NewMedication = {
  name: string;
  unitCount: number;
  unitType: string;
  frequencyCount: string;
  frequencyPerDay: string;
  frequencyTime: string;
  durationCount: number;
  durationType: string;
};

export type MedicationRow = {
  id: string;
  name: string;
  unit: string;
  frequency: string;
  duration: string;
  isNew?: boolean;
  isDeleted?: boolean;
};

export type PrescriptionForm = {
  diagnostic: string;
  note: string;
  medications: MedicationRow[];
};

export type PrescriptinRow = {
  id: string;
  createdAt: string;
  diagnostic: string;
};



export type PrescriptionDetails = PrescriptinRow & {
  note: string;
  medications: MedicationRow[];
  patient: {
    id: string;
    firstName: string;
    firstNameAr: string;
    lastName: string;
    lastNameAr: string;
    birthDate: string;
  };
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    firstNameAr: string;
    lastNameAr: string;
    title: string;
    specialties: Specialty[];
    establishment: {
      contactNumber: string | null;
      secondaryContactNumber: string | null;
      city: StateCity;
      state: StateCity;
      addressLine1: string;
      images:{url:string}[]
    };
  };
};

export type AppointmentModalContentTypes =
  | 'prescriptions'
  | 'new-prescription'
  | 'edit-prescription';
