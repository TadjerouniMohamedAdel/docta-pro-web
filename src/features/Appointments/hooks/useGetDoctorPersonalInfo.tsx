import { useQuery } from 'react-query';
import { fetchDoctorPersonalInfo } from '../../Settings/views/DoctorProfile/services';

export const useGetDoctorPersonalInfo = () => {
  const { data, ...rest } = useQuery(['doctor-personal-info'], () => fetchDoctorPersonalInfo());
  return { doctorPersonalInfo: data ?? null, ...rest };
};
