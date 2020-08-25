const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const generator = require('generate-password');

const EmployeeSchema = new Schema({

    emp_name: {
        type: String,
        required: true
    },

    emp_last_name: {
        type: String,
        required: true
    },
    emp_email: {
        type: String,

    },
    password: {
        type: String,
        default: generator.generate({
            length: 7,
            numbers: true
        })
    },

    emp_id: {
        'type': String,
        'default': shortid.generate
    },

    addEmployeeDate: {
        type: Date,
        default: Date.now
    }
});


module.exports =Employee= mongoose.model('employees', EmployeeSchema);