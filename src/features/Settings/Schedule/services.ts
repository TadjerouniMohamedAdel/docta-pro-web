import fetcher from '../../../utils/fetcher';
import { WorkingHoursSchedule } from './types';

export const fetchWorkingHours = async (): Promise<{ data: WorkingHoursSchedule[] }> => {
  return fetcher('/api/v1/practitioners/schedule');
};

export const saveWorkingHours = async (params: WorkingHoursSchedule[]): Promise<any> => {
  return fetcher('/api/v1/practitioners/schedule', {
    body: params.filter((item) => item.isEdited),
    method: 'PUT',
  });
};
