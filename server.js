var db           = require('./models');
//require express frameware and additional modules
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const session    = require('express-session');

const User       = require('./models/user');
const saltRounds = 10;

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost/collection');
//// Routes ////

// use res.render to load the ejs view file\\\

// index page
app.get('/', function(req, res) {
  res.render('index');
});

app.get('/collections', function (req, res) {
  // send all books as JSON response
  db.Pet.find({}, function(err, pets){
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.render('collection',{pets:pets});
  });
});

//create
app.post("/collections", function(req,res){
  //get data from the form and add to the DB
  var petName   = req.body.petName;
  var breed     = req.body.breed;
  var age       = req.body.age;
  var sex       = req.body.sex;
  var imageurl  = req.body.imageurl;

  var newPet    =
  {petName:petName,
    breed:breed,
    age:age,
    sex:sex,
    imageurl:imageurl
  }
  //Create a new pet and save it to the DB
  db.Pet.create(newPet, function(err,newlyCreatedPet){
    if(err){
      console.log(err);
    } else {
      //redirect back to collections page
      res.redirect('/collections');
    }
  });
});

app.get('/signup', function (req, res) {
  res.render('signup');
});

app.post('/signup', (req, res) => {
	console.log("PARAMS:", req.params);
	console.log("BODY:", req.body);

  let username = req.body.username;

  // hash the password
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // save the password digest (hash) to the user
	let user = new User({username: username, passwordDigest: hash});
	user.save().then(() => {
		console.log("New user created!", username);
		req.session.user = user;
		res.redirect('/collections')
	})
  });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
