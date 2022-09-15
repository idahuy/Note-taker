const express = require("express");
const fs = require("fs");
const path = require("path");
const db = require('./db/db');
const app = express();
const PORT = process.env.PORT || 3000;

// express middleware
app.use(express.static('public')); // link to assets
// this sets up data parsing where express will interprety it as json required for api calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// on page load start index.html
app.get('/', (res, req) => {
    res.sendFiles(path.join(__dirname, '/public/index.html'));
})

// notes html and its url
app.get('/notes', (req, res) => {
    res.sendFiles(path.join(__dirname, '/public/notes.html'));
})

app.route('/api/notes')
    // GET the notes list (this would be updated for every new note and deleted note)
    .get((req, res) => {
        res.json(db);
    })

    // add a new note to the json db file
    .post((req, res) => {
        const jsonFilePath = path.join(__dirname, "/db/db.json");
        const newNote = req.body;

        // this allows the test note to be the origin note
        let highestId = 99;
        // this loops through the array and finds the highest ID
        for (let i = 0; i < db.length; i++) {
            let individualNote = database[i];

            if (individualNote.id > highestId) {
                // highestId will always be the highest numbered id in the notesArray.
                highestId = individualNote.id;
            }
        }
        // this assigns an id to the newNote
        newNote.id = highestId + 1;
        // push it to db.json
        database.push(newNote)

        // write the db.json file again
        fs.writeFile(jsonFilePath, JSON.stringify(db), (err) => {
            if (err) {
                res.status(400).json({ message: err.message });
                return;
            }
            res.json({
                message: 'success',
            });
        });
        res.json(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
        
    })