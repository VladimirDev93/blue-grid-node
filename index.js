// Imports
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();

// RESTful API Endpoint
app.get('/users', (req, res) => {
    // Get the query params
    let { name, email, limit } = req.query;

    // Connecto to MongoDB instance
    MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
        // Abort if error occures
        if (err) throw err;
        // Get the database
        let dbName = db.db('VladimirJovanovic');
        
        // If there are no query strings
        if (!/\?.+/.test(req.url)) {
            // Search through the collection and return all users
            dbName.collection('users').find({}, (err, res) => {
                if (err) throw err;
                // Print the results to the console
                console.log(res)
                // Close the database connection
                db.close();
            });
        } else {
            // Search through the collection with selectors and limit
            // the response results
            dbName.collection('users').find({ email, name }, (err, res) => {
                if (err) throw err;
                // Print the results to the console
                console.log(res)
                // Close the database connection
                db.close();
            }).limit(limit);
        }
    });
    res.end();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('The application is running');
});
