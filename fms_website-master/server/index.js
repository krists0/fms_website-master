const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
//const path =require('path');
const keys=require('./config/keys');
const passport = require('passport');
const users = require('./routes/api/users');
const employees = require('./routes/api/employees');
const calls = require('./routes/api/calls');
const activity = require('./routes/api/activity');
//const empAuth = require('./routes/api/empAuth');
const empCalls = require('./routes/api/empCalls');

const app=express();




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//mongoose.Promise = Promise;

mongoose.connect(keys.mongoURI , {useNewUrlParser: true }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);



// Use Routes
app.use('/api/users', users);

app.use('/api/employees', employees);

app.use('/api/calls', calls);

app.use('/api/activity',activity);

app.use('/api/empCalls',empCalls);

//app.use('/api/empAuth',empAuth);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));





























