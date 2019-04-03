// Imports
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

// RESTful API Endpoint
app.get('/users', (req, res) => {
    // Get the query params
    let { name, email, limit } = req.query;

    // Connecto to MongoDB instance
    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, (err, db) => {
        // Abort if error occurs
        if (err) throw err;
        // Get the database
        let dbName = db.db('VladimirJovanovic');
        let collection = dbName.collection('users');

        // If there are no query strings
        if (!/\?.+/.test(req.url)) {
            // Search through the collection and return all users
            collection.find({}).toArray(function(err, result) {
                if (err) throw err;
                res.end(JSON.stringify(result));
                db.close();
              });
        } else if (req.query.limit) {
            // Search through the collection and return all the users 
            // with a limited number of objects
            collection.find({}).limit(Number(limit)).toArray(function(err, result) {
                if (err) throw err;
                res.end(JSON.stringify(result));
                db.close();
              });
        } else {
            // Search through the collection with selector(s)
            collection.find({ $or: [{ 'email': email }, {'name': name }] }).toArray(function (err, result) {
                if (err) throw err;
                res.end(JSON.stringify(result));
                db.close();
            });
        }
    });
});

app.listen(10254, () => {
    console.log('The application is running on port 10254');
});
