export type Permissions = {
  id: string;
  name: string;
  code: string;
  checked?: boolean;
};

export type Sections = {
  id: string;
  name: string;
  code: string;
  permissions: Permissions[];
};

export type Role = {
  id: string;
  name: string;
  code: string;
  permissions: Permissions[];
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
