const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateLoginInput = require('../../validation/login');

// Load Employee model
const Employee = require('../../models/Employee');



// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/empLogin', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const emp_email = req.body.email;
    const password = req.body.password;

    // Find employee by email
    Employee.findOne({ emp_email }).then(emp=> {
        // Check for employee
        if (!emp) {
            errors.emp_email = 'User not found';
            return res.status(404).json(errors);
        }

        // Check Password
        //bcrypt.compare(password, emp.password).then(isMatch => {
            if (password===emp.password) {
                // employee Matched
                const payload = { emp_id: emp.emp_id, emp_name: emp.emp_name ,emp_last_name:emp.emp_last_name }; // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                errors.password = 'Password incorrect';
                return res.status(400).json(errors);
            }
        //});
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
// router.get(
//     '/empCurrent',
//     passport.authenticate('jwt', { session: false }),
//     (req, res) => {
//         res.json({
//             id: req.emp_id,
//             //name: req.user.name,
//             email: req.emp_email
//         });
//     }
// );

module.exports=router;