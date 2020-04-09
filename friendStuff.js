var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var friendSchema = new Schema({
            "username" : String,
        "password" : String,
        "email" : String,
        "Friends_username" : [],
        "Event_name" : [],
        "month_id" : [],
        "day_id" : [],
    "verifyFriendShip" : Number },
    { collection : 'Friends' });
module.exports = mongoose.model('Friend', friendSchema);
