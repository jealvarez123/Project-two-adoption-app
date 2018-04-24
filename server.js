console.log('Can I kick it?');
//require express frameware and additional modules
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
mongoose = require('mongoose');


// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
 app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect('mongodb://@ds251799.mlab.com:51799/mlab');
//// Routes ////

// use res.render to load the ejs view file
app.get('/signup', function (req, res) {
  res.render('signup');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
