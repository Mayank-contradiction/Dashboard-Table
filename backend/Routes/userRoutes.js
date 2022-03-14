const express = require('express');
const router = express.Router();
const {registerUser,ResendEmailToken, emailVerification,getUser, loginUser, logoutUser, forgotPassword, resetPassword, updatePassword, getAllUsers, updateProfile, deleteUser, onRequestAccept, sendCertificate, sendJMCerts, sendALetter, changeRole, getAdminUserProfile} = require('../controllers/userController');
const {isAuthenticated, authorizedRoles} = require('../middlewares/userAuth')

//user routes
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/user", isAuthenticated, getUser);
router.get("/logout",logoutUser);

//admin routes
router.get("/listofusers", isAuthenticated, authorizedRoles('admin'), getAllUsers);
router.get("/admin/changeRole/:id", isAuthenticated, authorizedRoles('admin'), changeRole);
router.delete("/admin/userDelete/:id", isAuthenticated, authorizedRoles('admin'), deleteUser);

module.exports = router;