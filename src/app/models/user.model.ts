export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
