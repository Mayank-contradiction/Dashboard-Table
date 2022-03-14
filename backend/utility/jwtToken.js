//Create and send token and ave in the cookie.
const sendToken = async function(user, statuscode, res) {
    //Create Jwt token
    const token = await user.generateAuthToken();
    //Options for cookies
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY_TIME *24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    res.status(statuscode).cookie('token',token, option).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;