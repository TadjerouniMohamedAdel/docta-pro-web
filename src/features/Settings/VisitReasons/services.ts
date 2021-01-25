import fetcher from '../../../utils/fetcher';

export const fetchSpecialties = async (): Promise<any> => {
  return fetcher('/api/v1/practitioners/specialties');
};

export const fetchVisitReasons = async (id: string): Promise<any> => {
  return fetcher(`/api/v1/practitioners/specialties/${id}/reasons`);
};
