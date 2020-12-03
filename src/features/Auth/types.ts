import { ApiResponse } from '../../interfaces/api';

export type User = {
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type LoginParams = {
  phone: string;
  password: string;
};

export interface AuthResponse extends ApiResponse {
  data: User;
}
