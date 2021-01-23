export type Diploma = {
  id?: string;
  name: string;
  institute: string;
  graduationDate: Date | null;
  isNew?: boolean;
  isDeleted?: boolean;
  isEdited?: boolean;
};

export type Language = {
  id?: string;
  code: string;
  name: string;
  isNew?: boolean;
  isDeleted?: boolean;
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

export type FetchDoctorPersonalInfoResponse = {
  bio: string;
  birthDate: string;
  email: string;
  firstName: string;
  lastName: string;
  formations: Diploma[];
  gender: string | undefined;
  languages: Language[];
  phone: string;
  picture: string;
  specialties: {
    specialty: {
      name: string;
    };
  }[];
};

export type DoctorInfo = {
  firstName: string;
  lastName: string;
  specialties: { name: string }[];
};
