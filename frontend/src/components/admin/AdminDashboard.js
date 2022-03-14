import '../css/admindashboard.css';
import React, {useState, useEffect} from 'react'
import MetaData from '../layouts/MetaData'
import { MDBDataTable } from 'mdbreact'
import {useAlert} from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {getUsersList, adminRemoveUser, adminChangeRole, clearErrors} from '../../actions/userActions'
import Header from '../layouts/Header'

const AdminDashboard = () => {
    const [deleteUserId, setDeleteUserId] = useState('');

    const { deleteUserLoading, deleteUserMessage, deleteUserError } = useSelector(state => state.deleteUser);
    const {usersListLoading, usersList, usersListError } = useSelector(state => state.getUsersList);
    const { userLoginMessage } = useSelector(state=> state.userLogin);

    const {roleChangeLoading, roleChangeMessage, roleChangeError } = useSelector(state => state.changeUserRole);

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsersList());
        if(usersListError){
            alert.error(usersListError);
        }
    }, [dispatch, alert, usersListError]);

    useEffect(() => {
        if(!roleChangeLoading){
            if(roleChangeError){
                alert.error(roleChangeError);
                dispatch(clearErrors);
            }
            if(roleChangeMessage && roleChangeMessage.success && roleChangeMessage.message){
                alert.success(roleChangeMessage.message);
                dispatch(getUsersList());
            }
        }
    }, [dispatch, alert, roleChangeLoading]);

    useEffect(() => {
        if(!deleteUserLoading){
            if(deleteUserError){
                alert.error(deleteUserError);
                dispatch(clearErrors);
            }
            if(deleteUserMessage && deleteUserMessage.success && deleteUserMessage.message){
                alert.success(deleteUserMessage.message);
                dispatch(getUsersList());
            }
        }
    }, [dispatch, alert, deleteUserLoading]);

    const getDate  = (dt) => {
        const d = new Date(0);
        d.setUTCSeconds(dt);
        return d.toLocaleDateString();
    }

    const setUsers = ()=>{
        const data = {
            columns: [
                {
                    label: 'User Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'DOB',
                    field: 'dob',
                },
                {
                    label: 'Phone',
                    field: 'phone'
                },
                {
                    label: 'Address',
                    field: 'address',
                },
                {
                    label: 'Role',
                    field: 'role'
                },
                {
                    label: 'Actions',
                    field: 'actions'
                }
            ],
            rows: []
        }
        if(usersList && usersList.list){
            usersList.list.forEach(aUser => {
                if(aUser._id !== userLoginMessage._id){
                    data.rows.push({
                        name: aUser.name , 
                        email: aUser.email ,
                        dob: getDate(aUser.dob),
                        phone: aUser.phone ,
                        address: aUser.address,
                        role: aUser.role,
                        actions: <p className="text-center"> <button className="btn btn-outline-success mb-2" onClick={(e)=> {roleChange(aUser._id)}}><i className="fas fa-exchange-alt"></i></button> <button onClick={(e)=> {setDeleteUserId(aUser._id);}} className="btn btn-outline-danger mb-2" data-toggle="modal" data-target="#deleteUser"><i className="fas fa-user-slash"></i></button></p>
                    })
                }
            });
        
        }
        return data;
    }

    async function deleteUser(userId) {
        await dispatch(adminRemoveUser(userId));
    }

    async function roleChange(userId){
        await dispatch(adminChangeRole(userId));
    }

    return (
        <>
            <MetaData title={"Admin Dashboard"}/>
            <Header/>
            <div className="modal fade" id="deleteUser">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Deleting User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body">
                            <h4>Are you sure?</h4>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={(e)=> {deleteUser(deleteUserId)}} className="btn btn-success" data-dismiss="modal">Delete</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {userLoginMessage && userLoginMessage.name ? <div className="text-light mx-3"><h3>Hello {(userLoginMessage.name)}, you are Admin.</h3></div>: ''}

            <div className="container-fluid">
                <div className="d-flex text-center flex-wrap">
                    <div className="p-5 m-2 bg-light h5" style={{flexGrow: 1}}>
                        <span>Total Number Of Users<br/>
                        {usersList && usersList.list ? usersList.list.length : "Nil"}</span>
                    </div>
                    <div className="p-5 m-2 bg-light h5" style={{flexGrow: 1}}>
                        <span>Number Of Admins<br/>
                        {usersList && usersList.adminCount ? usersList.adminCount : "Nil"}</span>
                    </div>
                </div>
                {usersListLoading || deleteUserLoading || roleChangeLoading ? 
                <h4 className="text-center text-light">Loading...</h4> : 
                    <MDBDataTable 
                    data={setUsers()}
                    className="mt-4"
                    bordered
                    striped
                    hover
                    responsive
                    ></MDBDataTable>
                    
                }
            </div>
    </>
    )
}

export default AdminDashboard