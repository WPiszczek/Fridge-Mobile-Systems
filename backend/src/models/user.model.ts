export interface User {
  id: number;
  login: string;
  email: string;
  hashedPassword?: string;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
}