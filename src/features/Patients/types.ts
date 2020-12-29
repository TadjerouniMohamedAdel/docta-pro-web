import { Moment } from 'moment';

export type FormField = {
  key: string;
  value: any;
};

export type PersonalInfoForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: Moment | null | undefined;
  gender: string;
  address: string;
  state: string;
  city: string;
  generalStatus: string;
};

export type MedicalItems = 'medications' | 'allergies' | 'surgeries' | 'chronicIllnesses';

export type MedicalLists = {
  id?: string;
  name: string;
};

export type MedicalRecordsForm = {
  height: string;
  weight: string;
  bloodType: string | undefined;
  smoking: boolean | null;
  married: boolean | null;
  alcohol: boolean | null;
  medications: MedicalLists[];
  allergies: MedicalLists[];
  surgeries: MedicalLists[];
  chronicIllnesses: MedicalLists[];
};
