var express = require('express');
var router = express.Router();
var validator = require('validator');
var Event = require('../models/eventStuff.js');
var Friend = require('../models/friendStuff.js');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://mongodb5171oa:qy3dag@danu7.it.nuigalway.ie:8717/mongodb5171';//input whatever DB you are using
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
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

var FriendSchema = new Schema({"username" : String,
        "password" : String,
        "email" : String,
        "Friends_username" : [],
        "Event_name" : [],
        "month_id" : [],
        "day_id" : []},
    { collection : 'Friends' });

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

function myFriendFunction() {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;
    var FriendSchema = new Schema({
            "username" : String,
            "password" : String,
            "email" : String,
            "Friends_username" : [],
            "Event_name" : [],
            "month_id" : [],
            "day_id" : [],
            "verifyFriendShip" : Number },
        { collection : 'Friends' });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/calendar', function(req, res, next) {
    res.render('CalenderDesign');
});

router.get('/friends', function(req, res, next) {
    res.render('friendsPage');
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

var Test = mongoose.model("Test", TestSchema);
var FriendTest = mongoose.model("FriendTest", FriendSchema);
var doc = Test.updateOne(condition, update, options, callback);

router.post('/addEvent', function(req, res, next) {
    event = new Event(req.body);
    console.log(event);
    event.save(function (err,savedEvent) {
        if(err)
            throw err;
        res.json({
            "id": savedEvent._id
        });

    });
    myEventFunction();
    console.log("Event has been added");


});


router.post('/timeTable', function(req,res,next){
    res.render(timeTable);
});


router.post('/addFriends', function(req, res, next) {
    friend = new Friend(req.body);
    friend.save(function (err,savedFriend) {
        if(err)
            throw err;
        res.json({
            "id": savedFriend._id
        });

    });
    myFriendFunction();
    console.log("Friend has been added");

});

router.put('/putFriends', function(req, res, next){
    var update = {
        "$push": { "Friends_username": req.body.Friends_username }
    };
    Friend.findOneAndUpdate({"_id":req.body._id}, update, function (err, friendStuff){
        console.log(req.body._id);
        if (err) {
            throw err;
        } else {
            res.json({
                "id": friendStuff._id
            });
        }
    });
    });

router.get('/getFriends', function(req, res, next)
{
    Friend.find({}, function (err, friendStuff) {
        if (err)
            res.send(err);

        res.json(friendStuff);
    });
});

router.get('/findDelEvent', function(req, res, next){
    Event.find({},
        function(err, eventStuff){

            if(err) {
                res.send(err);
            }else {
                res.json(eventStuff);
            }

        })
});

var myobj = new Test({Event_name : "Software Engineering", month_id : "3", day_id : "day19"});
var condition = { "username" : "Henry40" };
var update = { $push:{ myobj}};
var options = { multi : true };
var query = Test.find(condition);

router.get('/getEvent', function(req, res, next) {
    Event.find({}, function (err, eventStuff) {
        if (err)
            res.send(err);

        res.json(eventStuff);
    });
});

router.delete('/removeEvent', function(req, res, next) {
    Event.deleteOne({_id: req.body._id}, function (err) {
        console.log(req.query._id);

        if (err)
            res.send(err);

        res.json({status: "Successfully removed the event"});
        var id = req.params.id;

    });

});

router.put('/deleteFriends', function(req, res, next) {
    var remove = { "$pull": {"Friends_username":req.body.Friends_username }};
    Friend.findOneAndUpdate({"_id":req.body._id}, remove, function (err, friendStuff) {
        if (err) {
            throw err;
        } else {
           console.log("removed");
            res.json({
                "id": friendStuff._id
            });
        }
    })

});

module.exports = router;
