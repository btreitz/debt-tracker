const { check, validationResult } = require('express-validator');

/*
 * Validation at Login
 */
const validationRulesLogin = () => {
    return [
        // email must be in format of email
        check('email').isEmail().withMessage('Email or password incorrect'),
        // passwords must be at least 6 chars long
        check('password').isLength({ min: 6 }).withMessage('Email or password incorrect')
    ]
};

/*
 * Validation at Registration
 */
const validationRulesRegistration = () => {
    return [
        // username can not contain spaces
        check('username')
            .custom((usernameValue, { req }) => {
                if (/\s/.test(usernameValue)) {
                    throw new Error('Username can not contain spaces');
                }
                return true
            }),
        // email needs to be in form of email
        check('email').isEmail().withMessage('Email is not valid'),
        // password must contain more than 5 character and match with confirmation password and can not contain spaces
        check('password').isLength({ min: 6 }).withMessage('Password must contain atleast 6 characters')
            .custom((passwordString, { req }) => {
                if (passwordString !== req.body.confPassword) {
                    throw new Error('Confirmation password does not match');
                }
                return true
            })
            .custom((passwordString, { req }) => {
                if (/\s/.test(passwordString)) {
                    throw new Error('Password can not contain spaces')
                }
                return true
            })
    ]
};

/*
 * Check if there are any errors
 * Throw error if there are errors
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push(err.msg));
    console.log(extractedErrors);

    return res.status(422).json({
        message: extractedErrors
    })
};

module.exports = {
    validationRulesLogin,
    validationRulesRegistration,
    validate,
};
