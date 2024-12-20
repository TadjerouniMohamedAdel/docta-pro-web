export type Diploma = {
  id: string;
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
  isNew?: boolean;
  isDeleted?: boolean;
};

export type DoctorPersonalInfoForm = {
  picture: string;
  file?: Blob;
  firstName: string;
  firstNameAr?: string;
  lastName: string;
  lastNameAr?: string;
  phone: string;
  email: string;
  birthDate: string;
  gender?: string;
  biography: string;
  diplomas: Diploma[];
  languages: Language[];
};

export type CabinetForm = {
  contactNumber: string;
  secondaryContactNumber: string;
  address: string;
  state: string;
  city: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type Image = {
  id: string;
  url: string;
  uid?: string;
  isNew?: boolean;
  isDeleted?: boolean;
};

export type DoctorCabinetInfoForm = {
  files: Blob[];
  services: Service[];
  images: Image[];
  cabinetForm: CabinetForm;
  location: Location;
};

export type FetchDoctorPersonalInfoResponse = {
  bio: string;
  birthDate: string;
  email: string;
  firstName: string;
  firstNameAr: string;
  lastName: string;
  lastNameAr: string;
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

export type FetchDoctorCabinetInfoResponse = {
  contactNumber: string;
  secondaryContactNumber: string;
  services: Service[];
  address: string;
  state: { id: string; name: string };
  city: {
    id: string;
    name: string;
  };
  images: Image[];
  geolocation: {};
};

export type DoctorInfo = {
  picture: string;
  firstName: string;
  lastName: string;
  specialties: { name: string }[];
};
