import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST,
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,
    LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL, CLEAR_ERRORS,
    ADMIN_GET_ALL_USERS_REQUEST, ADMIN_GET_ALL_USERS_SUCCESS, ADMIN_GET_ALL_USERS_FAIL,
    ADMIN_USER_DELETE_REQUEST, ADMIN_USER_DELETE_SUCCESS, ADMIN_USER_DELETE_FAIL,
    ADMIN_CHANGE_ROLE_REQUEST, ADMIN_CHANGE_ROLE_SUCCESS, ADMIN_CHANGE_ROLE_FAIL,
} from '../constants/userConstants';

export const registerUserReducer = (state = { registerUserMessage: {} }, action) =>{
    switch(action.type){
        case REGISTER_USER_REQUEST:
            return{
                ...state,
                registerUserLoading: true,
                registerUserError: null
            }
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                registerUserLoading: false,
                registerUserMessage: action.payload
            }
        case REGISTER_USER_FAIL:
            return{
                ...state,
                registerUserLoading: false,
                registerUserError: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                registerUserError: null
            }
        default:
            return state
    }
}

export const userLoginReducer = (state = { userLoginMessage: {} }, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                userLoginLoading: true,
                userLoginError: null
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                userLoginLoading: false,
                userLoginMessage: action.payload
            }
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
            return{
                ...state,
                userLoginLoading: false,
                userLoginError: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                userLoginMessage: {}
            }
        case LOGOUT_FAIL:
            return{
                ...state
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                userLoginError: null
            }
        default:
            return state
    }
}

export const getUsersListReducer = (state = { usersList: {} }, action) =>{
    switch(action.type){
        case ADMIN_GET_ALL_USERS_REQUEST:
            return{
                ...state,
                usersListLoading: true,
                usersListError: null
            }
        case ADMIN_GET_ALL_USERS_SUCCESS:
            return{
                ...state,
                usersListLoading: false,
                usersList: action.payload
            }
        case ADMIN_GET_ALL_USERS_FAIL:
            return{
                ...state,
                usersListLoading: false,
                usersListError: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                usersListError: null
            }
        default:
            return state
    }
}

export const changeUserRoleReducer = (state = { roleChangeMessage: {} }, action) =>{
    switch(action.type){

        case ADMIN_CHANGE_ROLE_REQUEST:
            return{
                ...state,
                roleChangeLoading: true,
                roleChangeError: null
            }
        case ADMIN_CHANGE_ROLE_SUCCESS:
            return{
                ...state,
                roleChangeLoading: false,
                roleChangeMessage: action.payload
            }
        case ADMIN_CHANGE_ROLE_FAIL:
            return{
                ...state,
                roleChangeLoading: false,
                roleChangeError: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                roleChangeError: null
            }
        default:
            return state
    }
}

export const deleteUserReducer = (state = { deleteUserMessage: {} }, action) =>{
    switch(action.type){
        case ADMIN_USER_DELETE_REQUEST:
            return{
                ...state,
                deleteUserLoading: true,
                deleteUserError: null
            }
        case ADMIN_USER_DELETE_SUCCESS:
            return{
                ...state,
                deleteUserLoading: false,
                deleteUserMessage: action.payload
            }
        case ADMIN_USER_DELETE_FAIL:
            return{
                ...state,
                deleteUserLoading: false,
                deleteUserError: action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                deleteUserError: null
            }
        default:
            return state
    }
}