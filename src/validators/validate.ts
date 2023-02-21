import Joi from "joi";
import { regex } from "../libs/errors/texts";

export const validateSignUp = Joi.object({
  first_name: Joi.string().alphanum().min(3).max(30).required(),
  last_name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().regex(regex.email).required(),
  password: Joi.string().regex(regex.password).required(),
});
