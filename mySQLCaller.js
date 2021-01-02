const { reject } = require('assert');
const { resolve } = require('path');
const ejs = require('ejs');
var mysql = require('promise-mysql');

var pool

mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'root',
  password: 'pa55word',
  database: 'geography'
}).then((result) => {
  pool = result
})
  .catch((error) => {
    console.log("error2")
});


var getAllSqldata = function() {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from city')
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
var getCountriesData = function () {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from country')
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

var getCountryData = function (co_code) {
  return new Promise((resolve, reject) => {
    var MyQuery = {
    sql:'SELECT * from country where co_code = ?',
    values: [co_code]
    }
    pool.query(MyQuery)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
var getCitiesData = function () {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from city')
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

var getCityData = function (cty_code) {
  return new Promise((resolve, reject) => {
    var MyQuery = {
    sql:'SELECT * from city where cty_code = ?',
    values: [cty_code]
    }
    pool.query(MyQuery)
      .then((results) => {
        resolve(results)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = { getAllSqldata, getCityData, getCountriesData, getCitiesData, getCountryData }