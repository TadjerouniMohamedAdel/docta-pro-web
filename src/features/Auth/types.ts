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

export interface AuthResponse extends ApiResponse {
  data: User;
}
