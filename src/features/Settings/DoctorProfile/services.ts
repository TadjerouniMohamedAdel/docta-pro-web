import fetcher from '../../../utils/fetcher';
import { DoctorPersonalInfoForm, FetchDoctorPersonalInfoResponse } from './types';

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
        (diplomas) => diplomas.isNew || diplomas.isDeleted || diplomas.isEdited,
      ),
    },
    method: 'PUT',
  });
};

export const fetchDoctorCabinetProfile = async (): Promise<any> => {
  return fetcher('/api/v1/professionals');
};

export const updateDoctorCabinetProfile = async (body: any): Promise<any> => {
  return fetcher('/api/v1/professionals', {
    body,
    method: 'PUT',
  });
};

export const fetchDoctorVisitReasons = async (): Promise<any> => {
  return fetcher('/api/v1/professionals');
};

export const fetchLanguages = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/languages?term=${term}`);
};
