//  importing the database 
const { syncAndSeed, models: { Student, Course, Enrolled }, conn } = require('./db');

// good old express which makes the magic serever
const express = require('express');

const path = require('path');

// I guess we are now putting that magic into app??
const app = express();

// this lets us send a json with our post request
app.use(express.json());

// magic code to deliver static files
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// the magic that let's us bring in the intail html file 
app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));


// router is pretty magical becuase now I have all the api in this folder amd it' just to you see /api
// well check that folder 
app.use('/api', require('./api'));


//  telling it to initalize 
 const init = async ()=> {
     try{
         await syncAndSeed();
        //  our deployed and local ports
         const port = process.env.PORT || 3000;
        //  our server listening for a request
         app.listen(port, ()=> console.log(`listening on port ${port}`))
     }
     catch(ex){
         console.log(ex);
     }
 };

 init();
