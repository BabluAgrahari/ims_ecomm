import Joi from "joi";

export const categoryValidation = async (data) => {
  const schema = Joi.object({
    category: Joi.string().required().messages({
      "any.required": "category field is required.",
    }),

    description: Joi.string().optional().allow("").max(500).messages({
      "string.max": "description field must be less than 500 characters.",
    }),

    status: Joi.number().required().valid(0, 1).messages({
      "any.required": "status field is required.",
      "any.only": "status field must be either 0 or 1.",
    }),
  });

  return schema.validate(data);
};
