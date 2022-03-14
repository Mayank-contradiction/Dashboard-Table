import React from 'react'
import MetaData from './layouts/MetaData'
import { useSelector } from 'react-redux'

const UserDashboard = () => {
    const { userLoginLoading, userLoginMessage} = useSelector(state=> state.userLogin);
    return (
        <>
            <MetaData title={" User Dashboard"}/>
            <div className="d-flex justify-content-center align-items-center inner-container text-center text-light">
                <div>
                    <h1 className="main-bigger-text">TRADE WITH <span style={{color: "rgb(149, 216, 186)"}}>MAYANK</span></h1>
                    {userLoginLoading === false && userLoginMessage ? <>
                    <h4 className="m-2 text-center">{`Hello ${userLoginMessage.name}, This is User Dashboard page.`}</h4>
                </>:''}
                </div>
            </div>
        </>
    )
}

export default UserDashboard