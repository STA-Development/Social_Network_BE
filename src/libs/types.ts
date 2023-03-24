export type UsersTypes = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export type JWTPayload = {
  id: number;
  iat: number;
};
export type UserPhotosTypes = {
  id: number;
  photo: string;
  userId: number;
};
