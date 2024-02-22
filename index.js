const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();

const db = new sqlite3.Database('./Database/Books.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
)`);

app.get('/books', (req,res) => {
    db.all(`SELECT * FROM books`, (err,rows) => {
        if (err) res.status(500).send(err);
        else res.json(rows);
    });
});

app.get('/books/:id', (req,res) => {
    db.get(`SELECT * FROM books WHERE id = ?`, req.params.id, (err,rows) => {
        if (err) res.status(500).send(err);
        else {
            if (!rows) res.status(404).send('Book not found');
            else res.json(rows);
        }
    });
});

app.post('/books', (req,res) => {
    const book = req.body;
    db.run(`INSERT INTO books (title,author) VALUES (?,?)`, book.title, book.author, function(err) {
        if (err) res.status(500).send(err);
        else {
            book.id = this.lastID;
            res.send(book);
        }
    });
});

app.put('/books/:id', (req,res) => {
    const book = req.body;
    db.run(`UPDATE books SET title = ?, author = ? WHERE id = ?`, book.title, book.author, req.params.id, function(err) {
        if (err) res.status(500).send(err);
        else res.send(book);
    });
});

app.delete('/books/:id', (req,res) => {
    db.run(`DELETE FROM books WHERE id = ?`, req.params.id, function(err) {                 
        if (err) res.status(500).send(err);
        else res.send({});
    });
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port http://localhost/${port}...`));