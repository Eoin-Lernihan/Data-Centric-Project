var express = require('express')()
const { render } = require('ejs')
var mySQLCaller = require('./mySQLCaller')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

var app = express
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

// using mongo DB in teh cloud
const strConnection = 'mongodb+srv://admin:admin@cluster0.ixqop.mongodb.net';

//creates the home page, with sub links
app.get('/', (req, res) => {
  mySQLCaller.getAllSqldata()
    .then((results) => {
      res.render('Home', { country: '/country', city: "/city", headState: 'HeadOfStates' })
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//create a general country page, sub links 
app.get('/country', (req, res) => {
  mySQLCaller.getCountriesData()
    .then((results) => {
      res.render('showCountry', { countries: results, home: "/", countryDetail: '/country/', add: '/addCountry', update: '/updateCountry/', delte: '/deleteCountry/' })
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//create a detail country page
app.get('/country/:country', (req, res) => {
  mySQLCaller.getCountryData(req.params.country)
    .then((results) => {
      console.log(results)
      // found the country
      if (results.length > 0) {
        res.render('showCountryDetails', { countries: results, countryLink: '/country' })
      }
      else {
        res.send('<h3>This country has not been loged in our data base</h3>')
      }
    })

    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})


//create a general city page, sub links 
app.get('/city', (req, res) => {
  mySQLCaller.getCitiesData()
    .then((results) => {
      res.render('showCity', { cities: results, home: '/', cityDetails: '/city/', countryLink: '/country/' })
    })

    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//create a detail city page
app.get('/city/:city', (req, res) => {
  mySQLCaller.getCityData(req.params.city)
    .then((results) => {
      console.log(results)

      // found the city
      if (results.length > 0) {
        res.render('showCityDetail', { cities: results, cityLink: '/city' })
      }
      else {
        res.send("This city has not been loged in our data base</h3>")
      }
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//create an add country page
app.get('/addCountry', (req, res) => {
  res.render('addCountry')
})

// adds the country to be data base
app.post('/addCountry', (req, res) => {
  console.log(req.body)
  mySQLCaller.addCountryData(req.body)
  res.send("This country has been add")
})

//create an update country page
app.get('/updateCountry/:country', (req, res) => {
  res.render('updateCountry', { country: req.params.country })
})

//create an update country page use co_code
app.post('/updateCountry/:country', (req, res) => {
  mySQLCaller.updateCountryData(req)
    .then((results) => {
      console.log(results)
      // if affectedRows is == 0 when it aleary exists in DB
      if (results.affectedRows == 0) {
        res.send('<h3>This country already has our data base or never existed</h3>')
      }
      else {
        res.send('<h3>This country has now been updated in our data base</h3>')
      }
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//creates a link to delete country
app.get('/deleteCountry/:country', (req, res) => {
  mySQLCaller.deleteCountryData(req.params.country)
    .then((results) => {
      console.log(results)
      if (results.affectedRows == 0) {
        res.send('<h3>This country has already been removed our data base or never existed</h3>')
      }
      else {
        res.send('<h3>This country has been removed our data base</h3>')
      }
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

//Creates an head of states
app.route('/HeadOfStates').get(function (req, res) {
  // connect to teh mogo server 
  MongoClient.connect(strConnection, function (err, client) {
    // send erro back to client
    if (err) return res.status(500).send({ error: err })

    // conncet to the Geography DB 
    var db = client.db('Geography');

    // get all of the head of states
    var cursor = db.collection('headOfState').find({});
    cursor.toArray(function (err, docs) {
      // send erro back to client
      if (err) return res.status(500).send({ error: err })
      res.render('showHeadState', { stateHead: docs, home: '/' });

      client.close();
    });
  });
});

//start up the application
app.listen(3004, () => {
  console.log("Listening")
})

