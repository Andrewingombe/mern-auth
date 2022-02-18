const mongoose = require('mongoose');

//connect to database
mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
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
