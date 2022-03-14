import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import { registerUserReducer, userLoginReducer, getUsersListReducer, changeUserRoleReducer, deleteUserReducer } from './reducers/userReducers';

const reducer = combineReducers({
    registerUser: registerUserReducer,
    userLogin: userLoginReducer,
    getUsersList: getUsersListReducer,
    changeUserRole: changeUserRoleReducer,
    deleteUser: deleteUserReducer,
})

let initialState = {};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;