var express = require('express') ()
const { render } = require('ejs')
var mySQLCaller = require('./mySQLCaller')
 

var app = express
app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  
 mySQLCaller.getAllSqldata()
 .then((results) => {
   
  res.render('showCity', {cities:results})
 })
 
 .catch((error) => {
  console.log(error)
  res.send("There seems to be an error, We are working to fix it. Please come back later")
 })
})


app.get('/country', (req, res) => {
  mySQLCaller.getCountryData()
  .then((results) => {
    res.render('showCountry', {countries:results})
   })  
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})

app.get('/city', (req, res) => {
  mySQLCaller.getCityData()
  .then((results) => {
    res.render('showCity', {cities:results})
   })
   
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})
app.listen(3004, () => {
    console.log("Listening")
})