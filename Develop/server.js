// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const { notes } = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (express.static('public'));

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (note.title === ""|| typeof note.title !== "string") {
        return false;
    }
    if (note.text === "" || typeof note.text !== "string") {
        return false;
    }
    return true
}

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

/* app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    let results = notes;
    return res.json(results);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})









app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});