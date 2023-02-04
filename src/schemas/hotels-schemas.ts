import { CreateOrUpdateEnrollmentWithAddress } from "@/services/enrollments-service";
import { getStates, isValidCEP, isValidCPF, isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import Joi from "joi";

const hotelIdValidation = Joi.string().length(11).custom(joiCpfValidation).required();

export const getHotelSchema = Joi.object({ hotelId: Joi.number().required() });

function joiCpfValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  if (!value) return value;

  if (!isValidCPF(value)) {
    return helpers.error("any.invalid");
  }

  return value;
}
