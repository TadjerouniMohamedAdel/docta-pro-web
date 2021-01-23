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
  return fetcher('/api/v1/practitioners/profile', {
    body: {
      picture: params.picture,
      firstName: params.firstName,
      lastName: params.lastName,
      bio: params.biography,
      gender: params.gender,
      birthDate: params.birthDate,
      languages: params.languages.filter((language) => language.isNew || language.isDeleted),
      formations: params.diplomas.filter(
        (diplomas) =>
          (diplomas.isNew && !diplomas.isDeleted) ||
          (diplomas.isDeleted && diplomas.id) ||
          diplomas.isEdited,
      ),
    },
    method: 'PUT',
  });
};

export const fetchDoctorCabinetProfile = async (): Promise<{
  data: FetchDoctorCabinetInfoResponse;
}> => {
  return fetcher('/api/v1/practitioners/cabinets/profile');
};

export const updateDoctorCabinetProfile = async (params: DoctorCabinetInfoForm): Promise<any> => {
  return fetcher('/api/v1/practitioners/cabinets/profile', {
    body: {
      contactNumber: params.cabinetForm.contactNumber,
      secondaryContactNumber: params.cabinetForm.secondaryContactNumber,
      services: params.services.filter(
        (service) => (service.isNew && !service.isDeleted) || (service.isDeleted && service.id),
      ),
    },
    method: 'PUT',
  });
};

export const fetchLanguages = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/languages?term=${term}`);
};

export const fetchServices = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/services?term=${term}`);
};
