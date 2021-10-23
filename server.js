// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

const { db } = require('./Develop/db/db.json');
const { application } = require('express');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use (express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    return res.json(db);
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    res.json(req.body)
})









app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});