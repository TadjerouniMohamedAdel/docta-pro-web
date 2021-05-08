import fetcher from '../../../utils/fetcher';
import {
  DoctorCabinetInfoForm,
  DoctorPersonalInfoForm,
  FetchDoctorCabinetInfoResponse,
  FetchDoctorPersonalInfoResponse,
} from './types';

export const fetchDoctorProfile = async (): Promise<any> => {
  return fetcher('/api/v1/professionals');
};

export const fetchDoctorPersonalInfo = async (): Promise<{
  data: FetchDoctorPersonalInfoResponse;
}> => {
  return fetcher('/api/v1/practitioners/profile');
};

export const updateDoctorPersonalInfo = async (params: DoctorPersonalInfoForm): Promise<any> => {
  const body = {
    ...(params.file ? { picture: params.file } : undefined),
    firstName: params.firstName,
    lastName: params.lastName,
    birthDate: params.birthDate,
    bio: params.biography,
    gender: params.gender ?? '',
    languages: JSON.stringify(
      params.languages.filter((language) => language.isNew || language.isDeleted),
    ),
    formations: JSON.stringify(
      params.diplomas.filter(
        (diplomas) =>
          (diplomas.isNew && !diplomas.isDeleted) || diplomas.isDeleted || diplomas.isEdited,
      ),
    ),
  };

  return fetcher('/api/v1/practitioners/profile', {
    body,
    method: 'PUT',
    hasFiles: !!params.file,
  });
};

export const fetchDoctorCabinetProfile = async (): Promise<{
  data: FetchDoctorCabinetInfoResponse;
}> => {
  return fetcher('/api/v1/practitioners/cabinets/profile');
};

export const updateDoctorCabinetProfile = async (params: DoctorCabinetInfoForm): Promise<any> => {
  const body = {
    ...(params.files && params.files.length > 0 ? { files: params.files } : undefined),
    contactNumber: params.cabinetForm.contactNumber,
    secondaryContactNumber: params.cabinetForm.secondaryContactNumber,
    services: JSON.stringify(
      params.services.filter(
        (service) => (service.isNew && !service.isDeleted) || service.isDeleted,
      ),
    ),
    images: JSON.stringify(params.images.filter((image) => image.isDeleted)),
  };

  return fetcher('/api/v1/practitioners/cabinets/profile', {
    body,
    method: 'PUT',
    hasFiles: params.files.length > 0,
  });
};

export const fetchLanguages = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/languages?term=${term}`);
};

export const fetchServices = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/services?term=${term}`);
};
