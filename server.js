var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('wl', ['wl']);
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/publicServer'));
app.use(bodyParser.json());

app.get('/filmList', function(req, res) {
  console.log('i receive a GET request');

  db.wl.find(function(err, docs) {
    //console.log(docs);
    res.json(docs)
  });
});

app.post('/filmList', function(req, res) {
  console.log('i receive a POST request');
  //console.log(req.body);
  db.wl.insert(req.body)
  db.wl.find(function(err, docs) {
    console.log('I return response from POST /filmList request');
    //console.log(docs);
    res.json(docs)
  });
});

app.post('/filmload', function(req, res) {
  console.log('I receive loading files');
  var films = req.body.film
  for (var i = 0; i<films.length; i++) {
    var singleResu = {film: films[i]}
    db.wl.insert(singleResu)
  }
  db.wl.find(function(err, docs) {
    console.log('I return response from POST /filmList request');
    //console.log(docs);
    res.json(docs)
  });
});

app.delete('/filmList', function(req, res) {
  console.log(req.body._id);
  db.wl.remove({_id: mongojs.ObjectId(req.body._id)})
  db.wl.find(function(err, docs) {
    console.log(docs);
    res.json(docs)
  });
});

app.put('/filmList', function(req, res) {
  console.log(req.body._id)
  console.log(req.body.newShow)
  db.wl.update(
    {_id: mongojs.ObjectId(req.body._id)},
    {$set: {"film.Show": req.body.newShow}}
  )

  db.wl.find(function(err, docs) {
    console.log(docs);
    res.json(docs)
  });
})
app.listen(3000);
console.log('Server running on port 3000');
