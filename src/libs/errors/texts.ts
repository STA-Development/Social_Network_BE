export const currentDate = Date.now();
export const localAddress = "http://localhost:3000";
export const typeName = "mysql";
export const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};
export const errorsText = {
  userNotExist: "User is not exist",
  invalidEmail: "Invalid email or password !",
  notAuthToken: "Not authorized token",
  TokenNotExist: "Token not found!",
  imageNotFound: "Image not Found!",
  NoProfile: "No Profile Image",
  NoCover: "No Cover Image",
  IdNotFound: "Id not Found!",
  TextNotFound: "Text is not Found ",
};
