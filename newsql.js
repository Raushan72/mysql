var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydatabase"
});

connection.connect();

const express = require('express');
const Api = express();
Api.use(express.json());
var uuid = require('uuid');
const Connection = require('mysql/lib/Connection');


Api.post('/', (req, res) => {
  const body = req.body;
  body.id = new Date().valueOf();
  connection.query(`insert into mytable values ("${body.name}", ${body.class},
   ${body.roll_number}, ${body.id})`,
   function (err,results) {
     if(err) throw err
     console.log('The result is: ', results);
   });
   res.send('added')
});
  



Api.get('/', (req, res) => {
  connection.query('select * from mytable',  function(err, results) {
    if (err) {
     res.send('error')
    }else{
     res.send(results)
    }
  });
});



Api.get('/:id', (req, res) => {
  const id = req.params.id
  connection.query(`select * from mytable where id = "${id}"`, function(err, result) {
    if (err){
       res.send('error')
    }else{
       res.send(result)
    }
  });
});


Api.put('/:id', (req, res) => {
  const id = req.params.id;
  const classs = req.params.class 
  connection.query(`update mytable set class = "class" where id = "${id}"`, function(err, result) {
    if (err){
      res.send('error hai')
    }else{
      res.send('updated')
    }
  });
});




Api.delete('/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`delete from mytable where id = "${id}"`, function(err, result, fields) {
    if (err){
      res.send('error')
    }else{
      res.send('deleted')
    }
  });
});






Api.listen(3000, () => {
    console.log('server is going on')
});


// const id = "1";
// const name = "Raju";
// const classNumber = 5;
// const query = `insert into mytable values('${id}', '${name}', ${classNumber})`;
// console.log(query); 
