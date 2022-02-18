const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./databases/init_mongodb');

//initialise express app
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

//main route
app.get('/', (req, res) =>
  res.status(200).send('<h1>This is a restricted & private route</h1>')
);
app.use('/auth', authRoutes);

//error handlers
app.use(async (req, res, next) => {
  next(createError.NotFound('Sorry! This page could not be found'));
});

app.use((err, req, res, next) => {
  res.status = err.status || 500;
  res.send({
    errors: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//ports
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
