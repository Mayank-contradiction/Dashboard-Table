import './css/login.css';
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import MetaData from './layouts/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, registerUser, clearErrors } from '../actions/userActions'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [logEmail, setLogEmail] = useState();
    const [logPassword, setLogPassword] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [dob, setDOB] = useState();

    const elementRef = useRef();

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { registerUserLoading, registerUserMessage, registerUserError} = useSelector(state=> state.registerUser);
    const { userLoginLoading, userLoginMessage, userLoginError} = useSelector(state=> state.userLogin);

    useEffect(() => {
        if(registerUserLoading === false){
            if(registerUserMessage && registerUserMessage.success){
                alert.success(registerUserMessage.message);
                setName('');
                setPassword('');
                setPhone('');
                setAddress('');
                setEmail('');
                setDOB('');
                elementRef.current.click();
            }
            if(registerUserError){
                if(registerUserError.startsWith("E11000 duplicate key error collection")){
                    alert.error("User with this email already exists.");
                }else
                    alert.error(registerUserError);
                dispatch(clearErrors);
            }
        }
    }, [registerUserLoading]);

    useEffect(() => {
        if(userLoginLoading === false){
            if(userLoginMessage){
                if(userLoginMessage.role === 'user'){
                    history.push('/userdashboard');
                }
                if(userLoginMessage.role === 'admin'){
                    history.push('/admindashboard');
                }
            }
            if(userLoginError){
                alert.error(userLoginError);
                dispatch(clearErrors);
            }
        }
    }, [userLoginLoading]);

    const emptyValidation = ()=>{
        let result = true;
        if(!name){
            result = false;
            alert.error("Name is required");
        }
        if(!email){
            result = false;
            alert.error("Email is required");
        }
        if(!password){
            result = false;
            alert.error("Password is required");
        }
        if(!phone){
            result = false;
            alert.error("Phone is required");
        }
        if(!address){
            result = false;
            alert.error("Address is required");
        }
        if(!dob){
            result = false;
            alert.error("DOB is required");
        }
        return result
    }

    const phoneValidation = ()=>{
        let result = true;
        if(phone){
            if(/\D/.test(phone)){
                alert.error("Phone number is incorrect.");
                result = false;
            }
            else{
                if(phone.length !== 10){
                    alert.error("Phone number is incorrect.");
                    result = false;
                }
            }
        }
        return result;
    }

    const nameValidation = ()=>{
        let result = true;
        if(name){
            if(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(name)){
                alert.error("Name should not contain special characters.");
                result = false;
            }
        }
        return result;
    }

    const ageValidation = ()=>{
        let result = true;
        if(dob){
            let eighteenYearsAgo = new Date();
            eighteenYearsAgo = eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear()-18);
            let enteredDate = new Date(dob);
            if(enteredDate > eighteenYearsAgo){
                alert.error("User must be 18+.");
                result = false;
            }
        }
        return result;
    }

    function loginFunction(e) {
        if(!logEmail || !logPassword){
            alert.error("Email and Password is required");
        }else{
            dispatch(login(logEmail,logPassword));
        }
    }

    function signupFunction(e){
        let res1 = emptyValidation();
        let res2 = phoneValidation();
        let res3 = nameValidation();
        let res4 = ageValidation();
        if(dob){
            let temp = new Date(dob);
            let dob2 = (Date.UTC(temp.getFullYear(), temp.getMonth(), temp.getDate()) / 1000);
            if(res1 && res2 && res3 & res4){
                dispatch(registerUser({email, password, name, address, phone, dob: dob2}));
            }
        }
    }
    return (
        <>
            <MetaData title={"Login"}></MetaData>
            <div className="container register">
                <div className="row">
                    <div className="col-md-3 register-left">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Welcome</h3>
                        <p>You are 30 seconds away from earning your own money by trading!</p>
                    </div>
                    <div className="col-md-9 register-right">
                        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="login-tab" data-toggle="tab" href="#login" role="tab" ref={elementRef}>LogIn</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="signup-tab" data-toggle="tab" href="#signup" role="tab">SignUp</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="login" role="tabpanel">
                                <h3 className="register-heading">LogIn</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="email" value={logEmail} onChange={(e)=>{setLogEmail(e.target.value)}} className="form-control" placeholder="Your Email" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" value={logPassword} onChange={(e)=>{setLogPassword(e.target.value)}} className="form-control" placeholder="Password" />
                                        </div>
                                        <button type="button" onClick={loginFunction} className="btnRegister">Log In</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade show" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                                <h3 className="register-heading">Sign Up</h3>
                                <div className="row register-form">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" maxLength="10" minLength="10" value={phone} onChange={(e)=>{setPhone(e.target.value)}}className="form-control" placeholder="Phone" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <input type="date" value={dob} onChange={(e)=>{setDOB(e.target.value)}} className="form-control" placeholder="dd-mm-yyyy" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}}className="form-control" placeholder="Address" />
                                        </div>
                                        <button type="submit" onClick={signupFunction} className="btnRegister">Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login