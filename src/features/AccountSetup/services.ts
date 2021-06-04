import { fetcher } from '../../common/utilities';

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
