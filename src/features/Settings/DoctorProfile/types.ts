export type Diploma = {
  title: string;
  institute: string;
  date: Date | null;
};

export type Language = {
  code: string;
  name: string;
};

export type Service = {
  id: string;
  name: string;
};

export type DoctorPersonalInfoForm = {
  picture: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  gender?: string;
  biography: string;
  diplomas: Diploma[];
  languages: Language[];
};

export type AddressForm = {
  address: string;
  state?: string;
  city?: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type DoctorCabinetInfoForm = {
  services: Service[];
  images: [];
  addressForm: AddressForm;
  location: Location;
};
