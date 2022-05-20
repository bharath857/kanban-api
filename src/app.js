const connectDB = require('./db/mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

//error handlers
const notFound = require('./middleware/not-found');
const errorHandlder = require('./middleware/error-handler');

const user = require('./routers/user');

// middleware
app.use(express.json());

// routes
app.use('/user', user);

app.use(notFound);
app.use(errorHandlder);


const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
