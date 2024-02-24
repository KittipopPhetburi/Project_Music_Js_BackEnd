require("dotenv").config();

const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Musics.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS music (
    id INTEGER PRIMARY KEY,
    title TEXT,
    singer TEXT,
    genre TEXT,
    release_date TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT,
    name TEXT,
    age TEXT,
    phone_number CHAR
)`);

db.run(`CREATE TABLE IF NOT EXISTS playlist (
    playlist_id INTEGER PRIMARY KEY,
    playlistname TEXT,
    music_id INTEGER,
    titke TEXT,
    singer TEXT,
    user_id INTEGER
)`);

db.run(`CREATE TABLE IF NOT EXISTS review (
    review_id INTEGER PRIMARY KEY,
    music_id INTEGER,
    user_id INTEGER,
    score DOUBLE,
    comment TEXT
)`);

app.get('/music', (req,res) => {
    db.all(`SELECT * FROM music`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/music/:id', (req,res) => {
    db.get(`SELECT * FROM music WHERE id = ?`, req.params.id, (err,rows) => {
        if (err) res.status(500).send(err);
        else {
            if (!rows) res.status(404).send('Book not found');
            else res.json(rows);
        }
    });
});

app.post('/music', (req,res) => {
    const music = req.body;
    db.run(`INSERT INTO music (title,singer,genre,release_date) VALUES (?,?,?,?)`, music.title, music.singer,music.genre,music.release_date, function(err) {
        if (err) res.status(500).send(err);
        else {
            music.id = this.lastID;
            res.send(music);
        }
    });
});

app.put('/music/:id', (req,res) => {
    const music = req.body;
    db.run(`UPDATE music SET title = ?, singer = ? , genre = ? , release_date = ? ,WHERE id = ?`, music.title, music.singer,music.genre,music.release_date, function(err) {
        if (err) res.status(500).send(err);
        else res.send(music);
    });
});

app.delete('/music/:id', (req,res) => {
    db.run(`DELETE FROM music WHERE id = ?`, req.params.id, function(err) {
        if (err) res.status(500).send(err);
        else res.send({});
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));