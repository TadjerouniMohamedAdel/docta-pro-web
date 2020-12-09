export type Permission = {
  id: string;
  name: string;
  code: string;
  checked?: boolean;
};

export type Section = {
  id: string;
  name: string;
  code: string;
  permissions: Permission[];
};

export type Role = {
  id: string;
  name: string;
  code: string;
  permissions: Permission[];
};

export type User = {
  id: string;
  phone: string;
  email: string;
  password?: string;
};

export type Professional = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  picture: string;
  role: Role;
  user: User;
};

export type UserForm = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  roleId: string | undefined;
};
