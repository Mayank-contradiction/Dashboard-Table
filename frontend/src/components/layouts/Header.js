import React from 'react'
import { useHistory } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userLoginLoading, userLoginMessage} = useSelector(state=> state.userLogin);
    const logoutHandler = () => {
        dispatch(logout());
        history.go('/');
    }
    return (
        <nav className="navbar navbar-expand-sm mb-3 border-bottom">
            <a className="navbar-brand text-decoration-none text-light" href="/">Trade With <span className="text-success">Mayank</span></a>
            {!userLoginLoading && userLoginMessage && userLoginMessage ? <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                <a className="nav-link text-success" onClick={logoutHandler}href="#">Log Out</a>
                </li>
            </ul>
            :null}
        </nav>
    )
}

export default Header
