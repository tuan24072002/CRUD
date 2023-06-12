const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "react_crud",
    password: "admin@123",
    database: "crud"
})
app.get("/", (req, res) => {
    const sql = 'SELECT * FROM student';
    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error select * !!!");
        } else
            return res.json(data);
    })
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student (`name`,`email`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, data) => {
        if (err)
            return res.json("Error insert !!!");
        else
            return res.json(data);
    })
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student set name=?,email=? WHERE id=?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err)
            return res.json("Error update !!!");
        else
            return res.json(data);
    })
});
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id=?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err)
            return res.json("Error delete !!!");
        else
            return res.json(data);
    })
});
app.get('/select-one/:id', (req, res) => {
    const sql = 'SELECT * FROM student WHERE id=?';
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err)
            return res.json("Error delete !!!");
        else
            return res.json(data);
    })
});


app.listen(1234, () => {
    console.log("listening");
})