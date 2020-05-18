const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

mongo.connect(url, {}, (err) => {
    if (err) {
        console.error(err);
        return;
    }
});

const db = mongo.db('summoners');
const collection = db.collection();

// TODO: Implement functionality to store and remove summoners from database based on command
// This database will be used for the monitor to detect changes

collection.insertOne({/*fill this in*/}, (err) => {
    if (err) {
        console.error(err);
    }
});

