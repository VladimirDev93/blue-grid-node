// Imports
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

// RESTful API Endpoint
app.get('/users/?:name?:email', (req, res) => {
    // let { name, email } = req.query
    let name = req.query.name;
    let email = req.query.email;
    // Connecto to MongoDB instance
    MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
        // Abort if error occures
        if (err) throw err;
        // Get the database
        let dbName = db.db('VladimirJovanovic');
        // Search through the collection
        dbName.collection('users').findOne({ email, name }, (err, res) => {
            if (err) throw err;
            db.close();
        });
    });
});
