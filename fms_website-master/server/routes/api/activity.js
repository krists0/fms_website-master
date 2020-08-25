const express = require('express');
const router = express.Router();
const Activity=require('../../models/Activity');


//add new activity

router.post('/addNewActivity',(req,res)=>{

    const newActivity = new Activity({
        call:{
            _id: req.body.call._id,
            call_name: req.body.call.call_name,
            //     call_status:req.body.call_status,
            call_description: req.body.call.call_description,
            //     call_address: req.body.call_address,
            //     call_employee: req.body.call_employee,
            call_priority: req.body.call.call_priority
        } ,
        employee:{
            _id: req.body.employee._id,
            emp_name: req.body.employee.emp_name,
            emp_last_name:req.body.employee.emp_last_name,
            emp_email: req.body.employee.emp_email
        },
    });

    newActivity
        .save()
        .then(act => res.json(act))
        .catch(err => console.log(err));

});



//get activities from database route

router.get('/getActivity',(req,res)=> {

    Activity.find()
        .sort({date:-1})
        .then(act=>res.json(act))
        .catch(err=>res.status(404));

});


router.delete('/:id', (req, res) => {

    Activity.findById(req.params.id)
        .then(act => {
            // Delete
            act.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({activitynotfound: 'No post found'}));


});


module.exports=router;
