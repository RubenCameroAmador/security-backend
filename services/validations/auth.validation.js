import Joi from "joi"

const user_regex = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    lastname: Joi.string().min(4).max(16).required(),
    nickname: Joi.string().min(4).max(16).required(),
    password: Joi.string()
        .min(8)
        .max(256)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
        .required()
        .messages({
            "string.pattern.base": "Password doesn't meet security standards",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password must not exceed 256 characters"
        }),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().messages({
        'any.only': 'Passwords don\'t match'
    }),
})

const login_regex = Joi.object({
    nickname: Joi.string().min(4).max(16).required(),
    password: Joi.string().min(8).max(256).required()
})

export {
    user_regex,
    login_regex
}
