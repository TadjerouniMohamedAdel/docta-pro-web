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
