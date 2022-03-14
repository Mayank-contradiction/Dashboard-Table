import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { userLoginLoading, userLoginMessage} = useSelector(state=> state.userLogin);
    return (
        <>
            {userLoginLoading === false && (
                <Route
                    {...rest}
                    render = {props => {
                        if(!userLoginMessage){
                            return <Redirect to='/login' />
                        }else if(userLoginMessage && userLoginMessage.role === 'admin'){
                            return <Redirect to='/admindashboard' />
                        }
                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}

export default ProtectedRoute
