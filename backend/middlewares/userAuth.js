const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../config/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
//Checks if user is authenticated or not.
module.exports.isAuthenticated = catchAsyncErrors(async (req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler(''),401)
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
})
//Handling users roles
//This function take array of all roles that are in argument and compare it with database role if matched then only you have accessed.
module.exports.authorizedRoles = (...roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}