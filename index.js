var express = require('express')()
const { render } = require('ejs')
var mySQLCaller = require('./mySQLCaller')
var bodyParser = require('body-parser')

var app = express
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  mySQLCaller.getAllSqldata()
    .then((results) => {
      res.render('Home', { country: '/country', city: "/city", AUD: 'add_update_delte' })
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})


app.get('/add_update_delte', (req, res) => {
  mySQLCaller.getAllSqldata()
    .then((results) => {
      res.render('addUpdateDelete', { home: '/' })
    })
    .catch((error) => {
      console.log(error)
      res.send("There seems to be an error, We are working to fix it. Please come back later")
    })
})

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

app.get('/country/:country', (req, res) => {
  mySQLCaller.getCountryData(req.params.country)
    .then((results) => {
      console.log(results)
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

app.get('/city/:city', (req, res) => {
  mySQLCaller.getCityData(req.params.city)
    .then((results) => {
      console.log(results)
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




app.get('/addCountry', (req, res) => {
  res.render('addCountry')
})
app.post('/addCountry', (req, res) => {
 
  console.log(req.body)
  mySQLCaller.addCountryData(req.body)
  res.send("This country has been add")
})

app.get('/updateCountry/:country', (req, res) => {
  res.render('updateCountry', {country:req.params.country})
})

app.post('/updateCountry/:country', (req, res) => { 
  mySQLCaller.updateCountryData(req)
  .then((results) => {
  console.log(results)
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


app.listen(3004, () => {
  console.log("Listening")
})

