const express = require('express');
const Api = express();
Api.use(express.json());
var uuid = require('uuid');

var mysql = require('mysql');
const util = require('util')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydatabase'
});
const query = util.promisify(connection.query).bind(connection);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
  });


Api.post('/', async(req, res) => {
    const body = req.body
    body.id = new Date().valueOf()
    await runcommand(`INSERT INTO mytable VALUES ("${body.name}", ${body.class}, ${body.roll_number}, ${body.id}`)
    res.send('added') 
});



Api.get('/', (req, res) => {
  connection.query("SELECT * FROM mytable", function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
  
});


Api.get('/:id', (req, res) => {
  connection.query(`SELECT * FROM mytable where id = ${req.params.id}`, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
});




Api.put('/:id', (req, res) => {
  var sql = `UPDATE mytable SET name = "${req.body.name}", class = ${req.body.class}, roll_number = ${req.body.roll_number}
   WHERE id = ${req.params.id}`
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result)
  });
});



Api.delete('/:id', (req, res) => {
  const sql = `delete FROM mytable where id = ${req.params.id}`
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    res.send(result)
  });
});



Api.listen(3000, (req, res) =>{
  console.log('server is going on')
});





