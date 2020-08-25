const express = require('express');
const router = express.Router();
const Call=require('../../models/Call');




router.post('/addNewCall',(req,res)=>{

    const newCall = new Call({
        call_name: req.body.call_name,
        call_status: "קריאה פתוחה",
        call_description: req.body.call_description,
        //     call_address: req.body.call_address,
        //     call_employee: req.body.call_employee,
        call_priority: req.body.call_priority
    });

    newCall
        .save()
        .then(call => res.json(call))
        .catch(err => console.log(err));



});



//get calls from database route

router.get('/getCalls',(req,res)=> {

    Call.find()
        .sort({date:-1})
        .then(calls=>res.json(calls))
        .catch(err=>res.status(404));



});



router.delete('/:id', (req, res) => {

    Call.findById(req.params.id)
        .then(call => {
            // Delete
            call.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({callnotfound: 'No post found'}));


});






module.exports=router;