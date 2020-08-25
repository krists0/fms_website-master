//const Call=require ('./Call');
//const Employee=require('./Employee');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    call: {

        _id:{
            type: String,
           // required: true
        },

        call_name: {
            type: String,
            required: true
        },

        call_status: {
            type: String,
            //required: true
        },
        call_description: {
            type: String,
            required: true
        },

        call_address: {
            type: String,
            // required: true
        },

        addCallDate: {
            type: Date,

        },

        opened_by:{
            type: String,
        },


        call_pic: {
            type: String,
        },

        call_priority: {
            type: String,
            required: true
        },

    },
        //     required: true

    employee: {
        _id: {

            type: String,

        },

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

        },


        addEmployeeDate: {
            type: Date,

        },

    },
    activityStart:{
      type: Date,
      default: Date.now
    },

    activityEnd:{
        type:Date
    }

});


module.exports =Activity= mongoose.model('activity', ActivitySchema);
