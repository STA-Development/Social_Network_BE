import Joi from "joi";

export const ValidateSignUp = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
export const ValidateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
