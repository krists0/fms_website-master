const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewEmployeeInput(data) {
    let errors = {};

    data.emp_name = !isEmpty(data.emp_name) ? data.emp_name : '';
    data.emp_last_name = !isEmpty(data.emp_last_name) ? data.emp_last_name : '';
    data.emp_email = !isEmpty(data.emp_email) ? data.emp_email : '';
    //data.password = !isEmpty(data.password) ? data.password : '';
    //data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.emp_name, { min: 2, max: 30 })) {
        errors.emp_name = 'Name must be between 2 and 30 characters';
    }

    if (!Validator.isLength(data.emp_last_name, { min: 2, max: 30 })) {
        errors.emp_last_name = 'Name must be between 2 and 30 characters';
    }


    if (Validator.isEmpty(data.emp_name)) {
        errors.emp_name = 'Name field is required';
    }

    if (Validator.isEmpty(data.emp_last_name)) {
        errors.emp_last_name = 'Last Name field is required';
    }

    // if (Validator.isEmpty(data.emp_email)) {
    //     errors.emp_email = 'Email field is required';
    // }
    if(data.emp_email) {
        if (!Validator.isEmail(data.emp_email)) {
            errors.emp_email = 'Email is invalid';
        }
    }

    // if (Validator.isEmpty(data.password)) {
    //     errors.password = 'Password field is required';
    // }

    // if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    //     errors.password = 'Password must be at least 6 characters';
    // }

    // if (Validator.isEmpty(data.password2)) {
    //     errors.password2 = 'Confirm Password field is required';
    // } else {
    //     if (!Validator.equals(data.password, data.password2)) {
    //         errors.password2 = 'Passwords must match';
    //     }
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
