const User = require('../models/userModel');
const ErrorHandler = require('../config/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utility/jwtToken');

//Register a user => /api/v1/register
const registerUser = catchAsyncErrors(async (req, res, next)=>{
    try {
        const {name, dob, email, password, address, phone } = req.body;
        await User.create({name, dob, email, password, address, phone});
        res.status(200).json({
            success: true,
            message: `Data is saved successfully.`
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
});

//Login a user => /api/v1/login
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    //finding user in db
    const user = await User.findOne({email}).select('+password');
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password.', 401));
    }
    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Password', 401));
    }
    sendToken(user, 200, res);
})

//logout the user
const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null,{ 
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message:'Logged Out successfully.'
    })
})

//Get user if already login
const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

//ADMIN ROUTES
//Get all users => /api/v1/admin/users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const list = await User.find();
    const adminCount = list.filter((val)=>{
        if(val.role === 'admin')
            return true;
        else
            return false;
    }).length
    res.status(200).json({
        success: true,
        list,
        adminCount
    })
})

//change user role
const changeRole = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if(user.role === 'admin'){
        user.role = 'user';
        await user.save();
    }else{
        user.role = 'admin';
        await user.save();
    }
    res.status(200).json({
        success: true,
        message: "User role changed successfully."
    })
})

//Delete user details => api/v1/admin/user/:id 
const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    try {
        if(user){
            await user.remove();
        }
        res.status(200).json({success: true, message: 'User data deleted successfully.'})
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = {registerUser, loginUser, logoutUser, getUser,  getAllUsers, deleteUser, changeRole};