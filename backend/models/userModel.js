const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
            maxLength:[50, 'Your name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Please enter your email address'],
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email address']
        },
        dob:{
            type: String,
            required: [true, 'Please enter your date of birth']
        },
        address:{
            type: String,
            required: [true, 'Please enter your permanent address']
        },
        phone:{
            type: Number,
            required: [true, 'Please enter your phone number']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        },
        role: {
            type: String,
            default: 'user'
        }
    }
);

//Encryptin the password before save to database
userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Compare the password
userSchema.methods.comparePassword = async function(enteredPassword){
    const result = await bcrypt.compare(enteredPassword,this.password);
    return result;
}

//Assigning the web token to user
userSchema.methods.generateAuthToken = async function(){
    const specifictoken = await jwt.sign({id : this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.TOKEN_EXPIRY_TIME
    });
    return specifictoken;
}

//Creating Collection
const user = new mongoose.model("User",userSchema);
module.exports = user;