const express = require('express');
const app = express();
const userRouter = require('./Routes/userRoutes');
const errorMiddleware = require('./middlewares/errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(cookieParser());
app.use('/api/v1', userRouter);

//use to run backend in production mode
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => { 
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
})

app.use(errorMiddleware);

module.exports = app;