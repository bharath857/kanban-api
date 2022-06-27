const connectDB = require('./db/mongoose');
const express = require('express');
const app = express();

require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');//Helmet helps you secure your Express apps by setting various HTTP headers.
const cors = require('cors');//enable CORS with various options.
const xss = require('xss-clean');//sanitize user input coming from POST body, GET queries, and url params

//error handlers imports
const notFound = require('./middleware/not-found');
const errorHandlder = require('./middleware/error-handler');

//route handlers imports
const login = require('./routers/login/login');

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


// routes
app.use('/', login);


//middleware error handlers
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
    console.log('Error connecting to DB',error);
  }
};

startServer();
