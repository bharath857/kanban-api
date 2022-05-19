const express = require('express');
const app = express();

const connectDB = require('./db/mongoose');
const user = require('./routers/user');

require('dotenv').config();
const notFound = require('./middleware/not-found');
// middleware
app.use(express.json());

// routes
app.use('/user', user)

app.use(notFound)

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

/* const tasks = require('./routes/tasks');


const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler'); 


app.use('/api/v1/tasks', tasks);



app.use(notFound);
app.use(errorHandlerMiddleware);
*/
