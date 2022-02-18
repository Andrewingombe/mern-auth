const mongoose = require('mongoose');

//connect to database
mongoose
  .connect('mongodb://localhost:27017', { dbName: 'mern_auth' })
  .then(() => console.log(`Mongodb connected`))
  .catch((err) => console.log(err.message));

//mongose events and callbacks
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to Mongodb');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose has been disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
