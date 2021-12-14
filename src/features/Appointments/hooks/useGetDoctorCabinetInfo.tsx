import { useQuery } from 'react-query';
import { fetchDoctorCabinetProfile } from '../../Settings/views/DoctorProfile/services';

export const useGetDoctorCabinetInfo = () => {
  const { data, ...rest } = useQuery(['doctor-cabinet-info'], () => fetchDoctorCabinetProfile());
  return { doctorCabinetInfo: data ?? null, ...rest };
};
