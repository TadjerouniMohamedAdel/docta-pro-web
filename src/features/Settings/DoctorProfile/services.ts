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
  const formData = new FormData();
  formData.append('picture', params.file ?? new Blob());
  formData.append('firstName', params.firstName);
  formData.append('lastName', params.lastName);
  formData.append('bio', params.biography);
  formData.append('gender', params.gender || '');
  formData.append('birthDate', params.birthDate);
  formData.append(
    'languages',
    JSON.stringify(params.languages.filter((language) => language.isNew || language.isDeleted)),
  );
  formData.append(
    'formations',
    JSON.stringify(
      params.diplomas.filter(
        (diplomas) =>
          (diplomas.isNew && !diplomas.isDeleted) || diplomas.isDeleted || diplomas.isEdited,
      ),
    ),
  );

  return fetcher(
    '/api/v1/practitioners/profile',
    {
      body: formData,
      method: 'PUT',
    },
    true,
  );
};

export const fetchDoctorCabinetProfile = async (): Promise<{
  data: FetchDoctorCabinetInfoResponse;
}> => {
  return fetcher('/api/v1/practitioners/cabinets/profile');
};

export const updateDoctorCabinetProfile = async (params: DoctorCabinetInfoForm): Promise<any> => {
  const formData = new FormData();
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < params.files.length; index++) {
    formData.append('files', params.files[index]);
  }
  formData.append('contactNumber', params.cabinetForm.contactNumber);
  formData.append('secondaryContactNumber', params.cabinetForm.secondaryContactNumber);
  formData.append(
    'services',
    JSON.stringify(
      params.services.filter(
        (service) => (service.isNew && !service.isDeleted) || service.isDeleted,
      ),
    ),
  );
  formData.append('images', JSON.stringify(params.images.filter((image) => image.isDeleted)));

  return fetcher(
    '/api/v1/practitioners/cabinets/profile',
    {
      body: formData,
      method: 'PUT',
    },
    true,
  );
};

export const fetchLanguages = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/languages?term=${term}`);
};

export const fetchServices = async (term: string): Promise<any> => {
  return fetcher(`/api/v1/services?term=${term}`);
};
