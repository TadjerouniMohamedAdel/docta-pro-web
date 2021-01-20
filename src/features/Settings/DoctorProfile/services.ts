import fetcher from '../../../utils/fetcher';
import { FetchDoctorPersonalInfoResponse } from './types';

export const fetchDoctorProfile = async (): Promise<any> => {
  return fetcher('/api/v1/professionals');
};

export const fetchDoctorPersonalInfo = async (): Promise<{
  data: FetchDoctorPersonalInfoResponse;
}> => {
  return fetcher('/api/v1/practitioners/profile');
};

export const updateDoctorPersonalInfo = async (body: any): Promise<any> => {
  return fetcher('/api/v1/professionals', {
    body,
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
