import fetcher from '../../utils/fetcher';

export const fetchAppointments = async (from: Date, to: Date): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/?from=${from}&to=${to}&reasons=[]&status=[]`);
};

export const addAppointment = async (params: any): Promise<any> => {
  return fetcher('/api/v1/practitioners/appointments', { body: params });
};

export const fetchAppointmentsCount = async (from: Date, to: Date): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/count?from=${from}&to=${to}`);
};

export const fetchAppointmentsDetails = async (appointmentId: string): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/${appointmentId}`);
};
