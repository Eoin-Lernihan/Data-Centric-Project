const express = require('express')
const app = express()
const mongoose = require('mongoose');
var express = require('express')()
const { render } = require('ejs')
var bodyParser = require('body-parser')
const cors = require('cors');
const port = 4000

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
  const strConnection = 'mongodb+srv://admin:admin@cluster0.ixqop.mongodb.net/Geography?retryWrites=true&w=majority';
//const strConnection = 'mongodb+srv://admin:admin@cluster0.hrgmz.mongodb.net/Myfilm?retryWrites=true&w=majority';
mongoose.connect(strConnection, {useNewUrlParser: true});

const Schema = mongoose.Schema;
const headOfStateScheme = new Schema({
    _id:String,
    headOfState:String
})

const bookingModel = mongoose.model('Geography', headOfStateScheme);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.get('/api/bookings', (req, res) => {
    
//    if(req.query.futureOnly !== undefined && req.query.futureOnly == "true"){
 //       var cutoff = new Date();
  //      cutoff.setDate(cutoff.getDate());
  //      bookingModel.find({Date: {$gt: cutoff}}, (err,data)=>{
  //          res.json(data);
  //      })  
  //  }

  //  else{
  //      bookingModel.find((err,data)=>{
  //          res.json(data);
   //     })  
  //  }
    
    
    
//})

//app.get('/api/bookings/:id',(req, res)=>{

    //console.log(req.params.id);

    //bookingModel.findById(req.params.id, (err,data)=>{
  //      res.json(data);
 //   })
//})

//app.put('/api/bookings/:id',(req,res)=>{
  //  console.log("Update "+req.params.id);

    //bookingModel.findByIdAndUpdate(req.params.id,
      //  req.body,
        //(err,data)=>{
          //  res.status(201).send(data);
       // })
//})

//app.delete('/api/bookings/:id', (req, res)=>{
//    console.log(req.params.id);

//    bookingModel.findByIdAndDelete({_id:req.params.id},
//         (err, data)=>{
//        res.send(data);
//    })
//})


//app.post('/api/bookings', (req, res) => {
  //  console.log(req.body);

  //  bookingModel.create({
//        Name:req.body.Name,
  //      Date:req.body.Date,
    //    Time:req.body.Time,
      //  NumbersOfPeople:req.body.NumbersOfPeople,
        //ContactNumber:req.body.ContactNumber,
//        Email:req.body.Email
  //  })
    //.then()
    //.catch();

    //res.send('Data Recieved!');
//})

//app.listen(port, () => {
//    console.log(`Example app listening at http://localhost:${port}`)
//})