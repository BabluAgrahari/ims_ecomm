
import Joi from 'joi';

export const LoginValidation = async (data) => {

    const schema = Joi.object({

        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Please provide a valid email.',
                'any.required': 'Email is required.',
            }),
        password: Joi.string()
            .min(6)
            .when('id', {
                is: null,
                then: Joi.required(),
                otherwise: Joi.optional()
            }).
            messages({
                'string.min': 'Password must be at least 8 characters.',
                'any.required': 'Password is required.',
            })
    });

    return schema.validate(data)
}

// export default OutletValidation;
