var express = require('express');
var router = express.Router();

var validator = require('validator');
var Comment = require('../models/comments.js');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://mongodb5058ma:ni6vep@danu7.it.nuigalway.ie:8717/mongodb5058';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, });
console.log("Connected to db");
var Schema = mongoose.Schema;
var TestSchema = new Schema({
        "username": String,
        "password": String,
        "email": String,
        "Event_name": [],
        "month_id": [],
        "day_id": []
    },
    {collection: 'UserInfo'});


function myEventFunction() {


    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var TestSchema = new Schema({
            "username": String,
            "password": String,
            "email": String,
            "Event_name": [],
            "month_id": [],
            "day_id": []
        },
        {collection: 'UserInfo'});

}


var Test = mongoose.model("Test", TestSchema);
var myobj = new Test({Event_name : "Software Engineering", month_id : "3", day_id : "day19"});

var condition = { "username" : "Henry40" };
var update = { $push:{ Event_name : "Software Engineering", month_id : "3", day_id : "day26"}};
var options = { multi : true };
var query = Test.find(condition);

var doc = Test.updateOne(condition, update, options, callback);



/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hi there, i've been called");
    res.render('index', { title: 'Express' });
});

router.get('/calendar', function(req, res, next) {
    res.render('CalenderDesign');
});

router.get('/Friends', function(req, res, next) {
    res.render('CalenderDesign');
});


router.post('/signup', function(req, res, next){
    if(req.body.email){
        if(validator.isEmail(req.body.email))
        {
            res.json({"Success":"Correct email"});
        }
        else{
            res.json({"Error" : "Go away attacker"});
        }
    }
    else{
        res.json({"Error":"No email"})
    }
});





function callback (err, numAffected) {
    if (err) return console.error(err);
}

console.log("Event has been added");






/**
 * Adds comments to our database
 */

router.post('/addEvent', function(req, res, next) {

    myEventFunction();

});

/**
 Updates a comment already in the database
 */
router.get('/getEvents', function(req, res, next)
{
    Event.find({}, function (err, events) {
        if (err)
            res.send(err);

        res.json(events);
    });
});

/**
 * Deletes a comment from the database
 */
router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.deleteOne({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});



module.exports = router;