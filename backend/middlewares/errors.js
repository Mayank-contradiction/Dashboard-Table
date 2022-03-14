const ErrorHandler = require('../config/errorHandler');

let errors = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message;

    //Handling Mongoose Validation errors
    if(err.name === "ValidationError"){
        const message = Object.values(err.errors).map((value) => value.message);
        errors = new ErrorHandler(message, 400);
    }

    //Handling the mongoose the duplicate key error occurs in user same email address
    if(err.code === 11000) {
        const message = `User with this email already exists.`;
        error = new ErrorHandler(message, 400);
    }

    //Handling wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message = 'JSON Web Token is invalid. Try Again!!!';
        error = new ErrorHandler(message, 400);
    }

    //Handling Expired JWT error
    if(err.name === 'TokenExpiredError'){
        const message = 'JSON Web Token is expired. Try Again!!!';
        error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err,
        message: err.message
    })
}

module.exports = errors;