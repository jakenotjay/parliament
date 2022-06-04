const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

const members = require("./commons_divisions.json")

// insert many documents
const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('commons_divisions');
    // Insert some documents
    collection.insertMany(members, function (err, result) {
        assert.equal(err, null);
        // console.log("result", result)
        console.log(`Inserted ${result.insertedCount} documents into the collection`);
        callback(result);
    });
}


// Use connect method to connect to the Server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, function () {
            client.close();
    });
});