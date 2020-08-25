const express = require('express');
const router = express.Router();
const Call=require('../../models/Call');
const Activity=require('../../models/Activity');
//const Translate=require('../../googleApi/translateApi');
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'C:\\Users\\Mishapc\\WebstormProjects\\fsm_website\\server\\authTranslate.json';

 router.post('/addNewTranslateCall',async(req,res)=>{
    let description=await translateFunc(req.body.call_description);


    const newCall = new Call({
        call_name: req.body.call_name,
        call_status: "קריאה פתוחה",
        call_description: description,
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

router.get('/getEmpCalls/:id',(req,res)=> {
    const{id}=req.params;
    Activity.find({"employee._id":id})
        .then(activity=>{res.json(activity)})
        .catch(err=>res.status(404));



});





async function translateFunc(text) {

    const {Translate} = require('@google-cloud/translate');

    let projectId='fsmtranslate';
    const translate = new Translate({projectId});
    const target = 'iw';
//
    const [translation] = await translate.translate(text, target)
        .then(res=>{return res}).catch(err => {
        console.error('ERROR:', err);});


    return translation;
}


module.exports=router;