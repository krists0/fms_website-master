const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const CallSchema = new Schema({
     call_id: {
        type: String,
    //     required: true
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
        default: Date.now
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


});


module.exports =Call= mongoose.model('calls', CallSchema);