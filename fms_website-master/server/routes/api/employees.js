const express = require('express');
const router = express.Router();
const Employee=require('../../models/Employee');
const validateNewEmployeeInput = require('../../validation/add_new_employee');


//add new employee

router.post('/addNewEmployee',(req,res)=>{

    const { errors, isValid } = validateNewEmployeeInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newEmployee = new Employee({
        emp_name: req.body.emp_name,
        emp_last_name:req.body.emp_last_name,
        emp_email: req.body.emp_email,
    });

    newEmployee
        .save()
        .then(employee => res.json(employee))
        .catch(err => console.log(err));


});



//get the list of employees

router.get('/getEmployees',(req,res)=>{

 Employee.find()
     .sort({date: -1})
     .then(employee=>res.json(employee))
     .catch(err=>res.status(404));


});

//delete employee

router.delete('/:id', (req, res) => {

    Employee.findById(req.params.id)
        .then(employee => {
            // Delete
            employee.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({employeenotfound: 'No employee found'}));


});


//update employee details

router.post( '/update' , (req,res)=> {

    let empUpdate={

        $set:{emp_name:req.body.u_emp_name,
              emp_last_name:req.body.u_emp_last_name,
              emp_email:req.body.u_emp_email}
    };

    Employee.updateOne({"_id":req.body.id},empUpdate,(err , collection) => {
        if(err) throw err;
        else
        console.log("Record updated successfully");
        //console.log(collection);
    })
        .catch(err => res.status(404).json({employeenotfound: 'No employee found'}));



});




module.exports=router;