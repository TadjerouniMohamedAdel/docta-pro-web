import { fetcher } from '../../common/utilities';
import { WorkingHoursSchedule } from '../Settings/views/Schedule/types';

export const updateSetupAccountProgress = async (progress: number): Promise<any> => {
  return fetcher('/api/v1//professionals/account-progress', {
    body: { progress },
    method: 'PUT',
    showError: false,
  });
};

export const updateDoctorProfilePart1 = async (params: any): Promise<any> => {
  const body = {
    ...(params.file ? { picture: params.file } : undefined),
    firstName: params.firstName,
    firstNameAr: params.firstNameAr,
    lastName: params.lastName,
    lastNameAr: params.lastNameAr,
    birthDate: params.birthDate,
    gender: params.gender ?? undefined,
    email: params.email,
    languages: '[]',
    formations: '[]',
  };

  return fetcher('/api/v1/practitioners/profile', {
    body,
    method: 'PUT',
    hasFiles: !!params.file,
  });
};

export const updateDoctorProfilePart2 = async (params: any): Promise<any> => {
  const body = {
    bio: params.biography,
    languages: JSON.stringify(
      params.languages.filter((language: any) => language.isNew || language.isDeleted),
    ),
    formations: JSON.stringify(
      params.diplomas.filter(
        (diplomas: any) =>
          (diplomas.isNew && !diplomas.isDeleted) || diplomas.isDeleted || diplomas.isEdited,
      ),
    ),
  };

  return fetcher('/api/v1/practitioners/profile', {
    body,
    method: 'PUT',
  });
};

export const updateCabinetProfile = async (params: any): Promise<any> => {
  const body = {
    ...(params.files && params.files.length > 0 ? { files: params.files } : undefined),
    contactNumber: params.cabinetForm.contactNumber,
    secondaryContactNumber: params.cabinetForm.secondaryContactNumber,
    services: JSON.stringify(
      params.services.filter(
        (service: any) => (service.isNew && !service.isDeleted) || service.isDeleted,
      ),
    ),
    images: JSON.stringify(params.images.filter((image: any) => image.isDeleted)),
  };

  return fetcher('/api/v1/practitioners/cabinets/profile', {
    body,
    method: 'PUT',
    hasFiles: params.files.length > 0,
  });
};

export const saveAvailability = async (params: WorkingHoursSchedule[]): Promise<any> => {
  return fetcher('/api/v1/practitioners/schedule', {
    body: params.filter((item) => item.isEdited),
    method: 'PUT',
  });
};
