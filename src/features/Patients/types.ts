import { RcFile } from 'antd/lib/upload';
import { StateCity } from '../../common/types';

export type FormField = {
  key: string;
  value: any;
};

export type PersonalInfoForm = {
  picture?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  birthDate: string;
  gender?: string;
  state?: string;
  city?: string;
  generalStatus: string;
};

export type MedicalItems = 'medications' | 'allergies' | 'surgeries' | 'chronicIllnesses';

export type MedicalLists = {
  id?: string;
  name: string;
};

export type MedicalRecordsForm = {
  height?: number;
  weight?: number;
  bloodType?: string;
  smoking?: boolean;
  married?: boolean;
  alcohol?: boolean;
  medications: MedicalLists[];
  allergies: MedicalLists[];
  surgeries: MedicalLists[];
  chronicIllnesses: MedicalLists[];
};

export type FetchPersonalInfoResponse = {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  state: StateCity;
  city: StateCity;
  birthDate: string;
  gender: string;
  registered: boolean;
  generalStatus: string;
  user: { phone: string; email: string };
};

export type FetchMedicalRecordResponse = {
  id: string;
  alcohol: boolean;
  married: boolean;
  smoking: boolean;
  height: number;
  weight: number;
  bloodType: string;
  allergies: MedicalLists[];
  chronicIllnesses: MedicalLists[];
  medications: MedicalLists[];
  surgeries: MedicalLists[];
  registered: boolean;
};

export type SelectedPatient = {
  id: string;
  firstName: string;
  lastName: string;
  picture?: string;
  state?: StateCity;
  city?: StateCity;
  blocked?: boolean;
  registered?: boolean;
  user: {
    phone: string;
  };
};

export type BlockPatientParams = {
  patientId: string;
  reason: string;
  comment?: string;
};

export type PatientNote = {
  id: string;
  title?: string;
  body?: string;
  files?: RcFile[];
};

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
