import './css/main.css'
import MetaData from './layouts/MetaData'
import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import Header from './layouts/Header'

const Main = () => {
    const { userLoginLoading, userLoginMessage, isLogout} = useSelector(state=> state.userLogin);

    return ( 
    <>
        <MetaData title={'Home'}/>
        <Header/>
        <div className="d-flex justify-content-center align-items-center inner-container text-center text-light">
            <div>
                <h1 className="mx-2 main-bigger-text">TRADE WITH <span className="text-success">MAYANK</span></h1>
                <h5 className="m-2 text-center">An online community and resource for not only learning to trade but also for improving your skills regardless of what level of trading you are at.</h5>
                <br/>
                {!userLoginLoading && !isLogout && userLoginMessage && userLoginMessage ? <Link className="btn btn-lg btn-outline-light m-2" to={`${userLoginMessage.role === 'user' ? '/userdashboard' : 'admindashboard'}`} role="button">Dashboard</Link> : <Link className="btn btn-lg btn-outline-light m-2" to='/signup-login' role="button">Log In</Link>}
            </div>
        </div>
    </>
    )
}

export default Main
