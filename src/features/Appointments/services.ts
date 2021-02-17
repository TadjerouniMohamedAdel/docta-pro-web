import fetcher from '../../utils/fetcher';

export const fetchAppointments = async (startDate: Date, endDate: Date): Promise<any> => {
  return fetcher(
    `/api/v1//practitioners/appointments/?from=${startDate}&to=${endDate}&reasons=[]&status=[]`,
  );
};

export const addAppointment = async (params: any): Promise<any> => {
  return fetcher('/api/v1//practitioners/appointments', { body: params });
};
