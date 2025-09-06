const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const dbPromis = require('./lib/db.js');
const userModel = require('./models/user.model.js');

const userRoute = require('./routes/auth.route.js');

require('dotenv').config();

const app = express();
const PORT = 5001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173" ,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());

app.use('/api/auth',userRoute);

dbPromis
  .then(async () => {
    await userModel.createTableUsers();

    app.listen(PORT, () => {
      console.log("Server runig at portno ", PORT);
    });
  })
  .catch(error => {
    console.error('Failed to initialize database tables:', error.message);
  });
