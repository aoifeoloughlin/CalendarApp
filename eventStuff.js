var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var eventSchema = new Schema({
        "username": String,
        "password": String,
        "email": String,
        "Event_name": [],
        "month_id": [],
        "day_id": []
    },
    {collection: 'UserInfo'});
module.exports = mongoose.model('Event', eventSchema);
