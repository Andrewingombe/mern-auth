const express = require('express');
const morgan = require('morgan');
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

//ports
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
