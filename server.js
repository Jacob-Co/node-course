const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000; //so it can run on heroku and locally

// express set up
let app = express();
app.listen(port, () => {
  console.log(`Listening at ${port}`);
});

// handle bar set up
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

// middle wears
  // logger and timestemp
app.use((req, res, next) => { 
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
})

  // under maintenance middle wear
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// public dir
app.use(express.static(__dirname + '/public')); // serves up public directory

// request processing
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  }); // views contain templates for express
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Data not found'
  });
});
