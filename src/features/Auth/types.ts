import { ApiResponse } from '../../interfaces/api';

type Section = {
  id: string;
  name: string;
  code: string;
};

type Permission = {
  id: string;
  name: string;
  code: string;
  section: Section;
};

type Role = { name: string; code: string };

export type User = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  permissions: Permission[];
  role: Role;
};

export type LoginParams = {
  phone: string;
  password: string;
};

export type AccessCode =
  | 'appointments'
  | 'delete/appointments'
  | 'edit/appointments'
  | 'add/appointments'
  | 'patients'
  | 'delete/patients'
  | 'transfer/patients'
  | 'edit/patients'
  | 'add/patients'
  | 'settings'
  | 'users_roles/settings'
  | 'doctor_profile/settings'
  | 'reasons/settings'
  | 'subscription/settings'
  | 'availability/settings';

export interface AuthResponse extends ApiResponse {
  data: User;
}
