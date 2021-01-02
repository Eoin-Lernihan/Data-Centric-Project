var express = require('express') ()
const { render } = require('ejs')
var mySQLCaller = require('./mySQLCaller')
var bodyParser = require('body-parser')

var app = express
app.set('view engine' , 'ejs')

app.get('/', (req, res) => {
  
 mySQLCaller.getAllSqldata()
 .then((results) => {
   
  res.render('Home', {country:'/country', city:"/city"})
 })
 
 .catch((error) => {
  console.log(error)
  res.send("There seems to be an error, We are working to fix it. Please come back later")
 })
})


app.get('/country', (req, res) => {
  mySQLCaller.getCountriesData()
  .then((results) => {
    res.render('showCountry', {countries:results, home:"/", countryDetail:'/country/'})
   })  
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})


app.get('/country/:country', (req, res) => {
  mySQLCaller.getCountryData(req.params.country)
  .then((results) => {
    console.log(results)
    if(results.length>0){
    res.render('showCountryDetails', {countries:results, countryLink:'/country'})
    }
    else{
      res.send('<h3>This country has not been loged in our data base</h3>')
    }
   })  
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})


app.get('/city', (req, res) => {
  mySQLCaller.getCitiesData()
  .then((results) => {
    res.render('showCity', {cities:results, home:'/', cityDetails:'/city/'})
   })
   
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})


app.get('/city/:city', (req, res) => {
  mySQLCaller.getCityData(req.params.city)
  .then((results) => {
    console.log(results)
    if(results.length>0){
    res.render('showCityDetail', {cities:results, cityLink:'/city'})
    }
    else{
      res.send('<h3>This city has not been loged in our data base</h3>')
    }
   })  
   .catch((error) => {
    console.log(error)
    res.send("There seems to be an error, We are working to fix it. Please come back later")
   })
})




app.get('/addCountry', (req,res) => {
  res.render('addCountry')
})

app.post('/addCountry', (req,res) => {
res.send("This country has been add")
})

app.listen(3004, () => {
    console.log("Listening")
})

