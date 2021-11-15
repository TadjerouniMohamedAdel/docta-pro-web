import { fetcher } from '../../common/utilities';
import { AppointmentForm, AppointmentStatus, PrescriptionForm } from './types';

export const fetchAppointments = async (from: Date, to: Date, reasons: string[]): Promise<any> => {
  return fetcher(
    `/api/v1/practitioners/appointments/?from=${from}&to=${to}&reasons=${JSON.stringify(
      reasons,
    )}&status=[]`,
  );
};

export const addAppointment = async (params: any): Promise<any> => {
  return fetcher('/api/v1/practitioners/appointments', { body: params });
};

export const editAppointment = async ({
  appointmentId,
  appointmentForm,
}: {
  appointmentId: string;
  appointmentForm: AppointmentForm;
}): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/${appointmentId}`, {
    method: 'PUT',
    body: appointmentForm,
  });
};

export const updateAppointmentStatus = async ({
  appointmentId,
  status,
}: {
  appointmentId: string;
  status: AppointmentStatus;
}): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/${appointmentId}/status`, {
    method: 'PUT',
    body: { status },
  });
};

export const fetchAppointmentsCount = async (from: Date, to: Date): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/count?from=${from}&to=${to}`);
};

export const fetchAppointmentsDetails = async (appointmentId: string): Promise<any> => {
  return fetcher(`/api/v1/practitioners/appointments/${appointmentId}`);
};

export const addPrescription = async (
  params: PrescriptionForm & { patientId: string; appointment: string },
): Promise<{ data: { id: string } }> => {
  return fetcher(`/api/v1/professionals/patients/${params.patientId}/prescriptions`, {
    body: {
      ...params,
      patientId: undefined,
    },
  });
};
