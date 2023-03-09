const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// mongodb password
require('dotenv').config();
const pass = process.env.MONGO_DB_PASS;

// connect to mongodb
const dbURI = `mongodb+srv://uhrig:${pass}@nodecrashtutorial.k1k4rtb.mongodb.net/node-crash-tut?retryWrites=true&w=majority`;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    // listen for requests
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');
// By default view engine looks for views folder, we can change it by using set method below
// app.set('views', 'templates');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Third party middleware
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// redirects
app.get('/about-us', (req, res) => {
	res.redirect('/about');
});

// 404 page
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});
