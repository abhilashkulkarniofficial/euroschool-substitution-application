var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var parseJson = require('./utils/parseResult.js')
const serveStatic = require("serve-static")
const path = require('path');

require('dotenv').config();

const port = process.env.PORT || 80;

app = express();
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(cors());

var connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT
});

app.get('/', (req,res)=>{
    // console.log('got request')
    new Promise(function(resolve, reject){
      connection.connect(function(err) {
        if (err) {
          console.error('Database connection failed: ' + err.stack);
          return;
        }
        console.log('Connected to database.');
      });
      connection.query('USE school;')
      connection.end();
      res.send('connected to database')
    })
    
  });

app.get('/teachers', (req,res)=>{
    let classId = req.query.classId;
    let subject = req.query.subject;
    console.log(classId,subject)
    if(classId || subject){
        new Promise(function(resolve,reject){
            connection.query('USE school;')
            let query = `SELECT DISTINCT teacher_name from subjectTeachers where `
            if(classId){
                query = `${query} classId = "${classId}"`
            }
            if(classId && subject){
                query = `${query} and subject = "${subject}"`
            }else if(subject){
                query = `${query} subject = "${subject}"` 
            }
            query = `${query};`
            // console.log(query)
            connection.query(query, function(err, result, fields){
                if(err) res.send(err)
                if(result) {
                    // console.log(parseJson(result))
                    res.send(parseJson(result))
                }
            })
        })
    }else{
        res.send('bad request')
    }
})

app.listen(port,() => {
    console.log(`Substitution App API listening at http://localhost:${port}`)
  });