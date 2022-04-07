// so i do not really understand router but it lets us do the magic of exporting and importing this code
const router = require('express').Router();
const { models: { Student, Course, Enrolled } } = require('../db');


// ok so our first api god forbid you forget a slash
router.get('/students', async(req, res, next)=> {
    // pretty simple just get all our users 
    try {
        res.send(await Student.findAll());
    }
    // or tell us what went wrong 
    catch(ex){
        next(ex);
    }
});

router.get('/courses', async(req, res, next)=> {
    // pretty simple just get all our users 
    try {
        res.send(await Course.findAll());
    }
    // or tell us what went wrong 
    catch(ex){
        next(ex);
    }
});

// ohh you can put the :id in the middle interesting 
router.get('/students/:id/enrolled', async(req, res, next)=> {
    // pretty simple just get all our users 
    try {
        res.send(await Enrolled.findAll({
            // this is the same as SQL
            where: {
                studentId: req.params.id
            },
            // and here we are just joining the result back to coures
            // so maybe in SQL this is two quires??
            include: [
                Course
            ]
        }));
    }
    // or tell us what went wrong 
    catch(ex){
        next(ex);
    }
});

module.exports = router;