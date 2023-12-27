export interface User {
  id?: number;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin?: boolean;
  roles?: string[];
}
