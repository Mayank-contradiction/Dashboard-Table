import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useAlert} from 'react-alert'

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
    const alert = useAlert();
    const { userLoginLoading, userLoginMessage} = useSelector(state=> state.userLogin);
    return (
        <>
            {userLoginLoading === false && (
                <Route
                    {...rest}
                    render = {props => {
                        if(!userLoginMessage){
                            return <Redirect to='/login' />
                        }
                        if(userLoginMessage && userLoginMessage.role === 'user'){
                            alert.error('Access Denied');
                            return <Redirect to='/userdashboard'/>
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}

export default AdminProtectedRoute
