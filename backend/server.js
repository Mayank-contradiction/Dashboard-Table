//require('dotenv').config();
const app = require('./app');
//In development mode only

const getDatabaseConnection = require('./config/databaseConnection')

//Hadling uncaught Exception occur due to any reason.
process.on('uncaughtException', (error)=>{
    console.log(`ERROR: ${error.message}`);
    console.log('Shutting down the application due to Unhandled Exception');
        process.exit(1);
});

//Setting up the config file in development mode
const port = process.env.PORT || 8000;

//connect to mongoDB
getDatabaseConnection();

const server = app.listen(port,()=>{
    console.log(`Server is at ${port} started. ${process.env.NODE_ENV}`);
});

//handling the Unhandled Promise rejection
//occur if there is any problem in database url or port number defined in config.env file.
process.on('unhandledRejection', (error)=>{
    console.log(`ERROR: ${error.message}`);
    console.log('Shutting down the server due to Unhandeled promise Rejection');
    server.close(()=>{
        process.exit(1);
    });
});