var should = require('chai').should();
var request = require('supertest');

var host_url = 'http://danu7.it.nuigalway.ie:8642'
var container_url = host_url + '/getEvent/';
describe('Integration tests for Events REST APIs', function() {
    describe('Check parameters', function() {
        container = request(container_url);
        it('MUST contain event field', function(done) {
            container
                .get('')
                .expect(function(res){
                    res.body[0].should.have.property('Event_name');//for getting a specific variable in the DB
                })
                .expect(200, done);
        });
    });
});
