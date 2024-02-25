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

/* app.get('/music', (req,res) => {
    db.all(`SELECT * FROM music`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/music/:id', (req,res) => {
    db.get(`SELECT * FROM music WHERE id = ?`, req.params.id, (err,rows) => {
        if (err) res.status(500).send(err);
        else {
            if (!rows) res.status(404).send('music not found');
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
    db.run(`UPDATE music SET title = ?, singer = ? , genre = ? , release_date = ? WHERE id = ?`, music.title, music.singer,music.genre,music.release_date, req.params.id,function(err) {
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


 */


app.get('/user', (req,res) => {
    db.all(`SELECT * FROM user`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/user/:user_id', (req,res) => {
    db.get(`SELECT * FROM user WHERE user_id = ?`, req.params.user_id, (err,rows) => {
        if (err) res.status(500).send(err);
        else {
            if (!rows) res.status(404).send('user not found');
            else res.json(rows);
        }
    });
});

app.post('/user', (req,res) => {
    const user = req.body;
    db.run(`INSERT INTO user (user_id,username,password,name) VALUES (?,?,?,?)`, user.user_id, user.username,user.password,user.name, function(err) {
        if (err) res.status(500).send(err);
        else {
            user.user_id = this.lastID;
            res.send(user);
        }
    });
});

app.put('/user/:user_id', (req,res) => {
    const user = req.body;
    db.run(`UPDATE user SET username = ? , password = ? , name = ? WHERE user_id = ?`, user.username,user.password,user.name, req.params.user_id,function(err) {
        if (err) res.status(500).send(err);
        else res.send(user);
    });
});

app.delete('/user/:user_id', (req,res) => {
    db.run(`DELETE FROM user WHERE user_id = ?`, req.params.user_id, function(err) {
        if (err) res.status(500).send(err);
        else res.send({});
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));