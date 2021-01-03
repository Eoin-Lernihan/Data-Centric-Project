const { reject } = require('assert');
const { resolve } = require('path');
const ejs = require('ejs');
var mysql = require('promise-mysql');
const { log } = require('console');

var pool
//makes sql caller
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

//Gets all data form city
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
//Gets all data form country
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
//Gets data form a country depending on the co_code
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
//Gets all data form city
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
//Gets data form a city depending on cty code
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
//Add data into country
var addCountryData = function(body){
  return new Promise((resolve, reject) => {
    console.log(body)
    var MyQuery = {
      sql:'INSERT INTO country VALUES (?, ?, ?) '  ,
      values: [body.code, body.name, body.details]
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
//Updates data from country using co_code
var updateCountryData = function(req){
  return new Promise((resolve, reject) => {
    console.log(req.body)
    console.log(req.params.country)
    var MyQuery = {
      sql:'UPDATE country SET co_name = ?, co_details = ? where co_code = ? '  ,
      values: [req.body.name, req.body.details, req.params.country]
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
//Deletes data from country using co_code
var deleteCountryData = function(country){
  return new Promise((resolve, reject) => {
    console.log(country)
    var MyQuery = {
      sql:'delete from country where co_code = ? '  ,
      values: [country]
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

module.exports = { getAllSqldata, getCityData, getCountriesData, getCitiesData, getCountryData, addCountryData, updateCountryData, deleteCountryData}