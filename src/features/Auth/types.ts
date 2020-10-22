import { ApiResponse } from '../../interfaces/api';

export type User = {
  username: string;
};

export type LoginParams = {
  phone: string;
  password: string;
};

export interface AuthResponse extends ApiResponse {
  data: {
    token: string;
    user: User;
  };
}
