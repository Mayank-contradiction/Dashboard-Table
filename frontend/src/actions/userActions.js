import axios from 'axios';
import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS,
    ADMIN_GET_ALL_USERS_REQUEST, ADMIN_GET_ALL_USERS_SUCCESS, ADMIN_GET_ALL_USERS_FAIL,
    ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAIL,
    ADMIN_CHANGE_ROLE_REQUEST, ADMIN_CHANGE_ROLE_SUCCESS, ADMIN_CHANGE_ROLE_FAIL,
} from '../constants/userConstants';

//Login user
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({type : LOGIN_REQUEST})
        const config = {
            headers: {
                'content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/login', { email, password }, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    }catch(error){
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register user
export const registerUser =  (userData) => async(dispatch) => {
    try{
        dispatch({type : REGISTER_USER_REQUEST})
        const {data} = await axios.post('/api/v1/register', userData, {
            headers: {
                'content-Type': 'application/json'
            }
        });
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    }catch(error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async (dispatch) => {
    try{
        dispatch({type : LOAD_USER_REQUEST})
        const {data} = await axios.get('/api/v1/user');
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// get list of users
export const getUsersList =  () => async(dispatch) => {
    dispatch({type : ADMIN_GET_ALL_USERS_REQUEST})
    axios({
        method: 'get',
        url: "/api/v1/listofusers"
        }).then(function (response) {
            var { data } = response;
            dispatch({
                type: ADMIN_GET_ALL_USERS_SUCCESS,
                payload: data
            })
        }).catch(function (error) {
            dispatch({
                type: ADMIN_GET_ALL_USERS_FAIL,
                payload: error.response.data.message
            })
    });
}


//logout user
export const logout = () => async (dispatch) => {
    try{
        await axios.get('/api/v1/logout');
        dispatch({
            type: LOGOUT_SUCCESS
        })

    }catch(error){
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

//admin change role
export const adminChangeRole = (userId) => async (dispatch) => {
    dispatch({type : ADMIN_CHANGE_ROLE_REQUEST})
    axios({
        method: "get",
        url: `/api/v1/admin/changeRole/${userId}`,
        headers: { "Content-Type": 'application/json' },
        }).then(function (response) {
            var { data } = response;
            dispatch({
                type: ADMIN_CHANGE_ROLE_SUCCESS,
                payload: data
            })
        }).catch(function (error) {
            dispatch({
                type: ADMIN_CHANGE_ROLE_FAIL,
                payload: error.response.data.message
            })
    });
}

//admin delete user
export const adminRemoveUser = (userId) => async (dispatch) => {
    dispatch({type : ADMIN_USER_DELETE_REQUEST})
    axios({
        method: "delete",
        url: `/api/v1/admin/userDelete/${userId}`,
        headers: { "Content-Type": 'application/json' },
        }).then(function (response) {
            var { data } = response;
            dispatch({
                type: ADMIN_USER_DELETE_SUCCESS,
                payload: data
            })
        }).catch(function (error) {
            dispatch({
                type: ADMIN_USER_DELETE_FAIL,
                payload: error.response.data.message
            })
    });
}

//clear Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}