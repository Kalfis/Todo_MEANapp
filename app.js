'use strict'
const express = require('express');
const request = require('request');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beers_db');
// check if mongoose is working
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongoose connected');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public'))
app.use('/scripts', express.static(__dirname + '/node_modules'))
app.use(methodOverride());
app.use(routes);

app.get('/api/beers', function(req, res) {
  Beer.find(function(err, beers) {
    if (err)
    res.send(err)

    res.json(beers);
  });
});

app.post('/api/beers', function(req, res) {
  Beer.create({
    name: req.body.name,
    abv: req.body.abv,
    done: false
  }, function(err, beer) {
    if (err)
    res.send(err);

    Beer.find(function(err, beers) {
      if (err)
      res.send(err)
      res.json(beers);
    });
  });
});

app.delete('/api/beers/:beer_id', function(req, res) {
  beer.remove({
    _id: req.params.beer_id
  }, function(err, beer) {
    if (err)
    res.send(err);

    Beer.find(function(err, beers) {
      if (err)
      res.send(err)
      res.json(beers);
    })
  })
})
// server
const server = app.listen(3000, () => {
  console.log('server running')
});
