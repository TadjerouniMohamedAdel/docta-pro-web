import { fetcher } from '../../common/utilities';
import { BlockPatientParams } from './types';

export const fetchAllPatients = async (term = '', page = 0, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients?term=${term}&skip=${page}&take=${size}`);
};

export const fetchBlockedPatients = async (term = '', page = 0, size = 10): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients/blocked?term=${term}&skip=${page}&take=${size}`);
};

export const fetchPatientDetails = async (id = '', action: string): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients/${id}?action=${action}`);
};

export const addNewPatient = async (data: any): Promise<any> => {
  return fetcher('/api/v1/professionals/patients', {
    body: data,
  });
};

export const updatePatient = async (id: string, action: string, data: any): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients/${id}?action=${action}`, {
    body: data,
    method: 'PUT',
  });
};

export const deletePatientItem = async (
  id: string,
  recordId: string,
  action: string,
): Promise<any> => {
  return fetcher(
    `/api/v1/professionals/patients/${id}/medical-records/${recordId}?action=${action}`,
    {
      method: 'DELETE',
    },
  );
};

export const fetchPatientVisitHistory = async (
  patientId: string,
  page = 0,
  size = 10,
): Promise<any> => {
  return fetcher(
    `/api/v1/professionals/patients/${patientId}/appointments?skip=${page}&take=${size}`,
  );
};

export const blockPatient = async (params: BlockPatientParams): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients/${params.patientId}/block`, {
    body: { reason: params.reason, comment: params.comment },
  });
};

export const unblockPatient = async (patientId: string): Promise<any> => {
  return fetcher(`/api/v1/professionals/patients/${patientId}/unblock`, {
    method: 'DELETE',
  });
};
