export type FormField = {
  key: string;
  value: any;
};

export type PersonalInfoForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
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
  smoking: boolean | null;
  married: boolean | null;
  alcohol: boolean | null;
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
  state: string;
  city: string;
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
