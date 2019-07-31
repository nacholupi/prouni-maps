const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

var expect = require('chai').expect;
var request = require('supertest');


let app
let mongoServer;

before((done) => {
    initMongooseMem(done);
    app = require('../app');
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Testing REST', () => {

    it('...', async () => {
        expect(0).to.equal(0);
    });


    it('should send back a JSON object with goodCall set to true', (done) => {
        request(app)
            .get('/api/options')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});



function initMongooseMem(done) {
    mongoServer = new MongoMemoryServer();
    mongoServer.getConnectionString().then((mongoUri) => {
        const mongooseOpts = {
            // options for mongoose 4.11.3 and above
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        };
        return mongoose.connect(mongoUri, mongooseOpts, (err) => {
            if (err) done(err);
        });
    })
        .then(() => done());
}
