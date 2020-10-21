import { ApiResponse } from '../../interfaces/api';

export type User = {
  username: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export interface AuthResponse extends ApiResponse {
  data: {
    token: string;
    user: User;
  };
}
