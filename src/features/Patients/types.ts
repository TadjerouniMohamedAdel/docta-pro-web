export type FormField = {
  key: string;
  value: any;
};

export type PersonalInfoForm = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: null | Date;
  gender: string;
  address: string;
  state: string;
  city: string;
  generalStatus: string;
};
