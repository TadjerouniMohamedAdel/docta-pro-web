import fetcher from '../../../utils/fetcher';
import { FetchSpecialtyResponse, Specialty } from './types';

export const fetchSpecialties = async (): Promise<{ data: FetchSpecialtyResponse[] }> => {
  return fetcher('/api/v1/practitioners/specialties');
};

export const fetchVisitReasons = async (id: string): Promise<any> => {
  return fetcher(`/api/v1/practitioners/specialties/${id}/reasons`);
};

export const saveVisitReasons = async (specialty: Specialty): Promise<any> => {
  return fetcher('/api/v1/practitioners/reasons', {
    body: specialty.visitReasons.filter((visitReason) => visitReason.isEdited),
    method: 'PUT',
  });
};
