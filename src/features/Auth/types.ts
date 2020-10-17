export type User = {
  username: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};
