var express = require('express') ()
var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : 'pa55word',
    database        : 'geography'
  });

 

var app = express

app.get('/', (req, res) => {
    pool.query('SELECT * from city', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].cty_code);
        res.send(results[0].cty_code)
      });
})

app.listen(3004, () => {
    console.log("Listening")
})