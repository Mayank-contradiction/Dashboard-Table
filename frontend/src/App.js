import { useEffect } from 'react';
import Main from './components/Main';
import {Route} from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/Login';
import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions';
import store from './store';
import AdminProtectedRoute from './components/route/AdminProtectedRoute';

function App() {

  useEffect(()=>{
    store.dispatch(loadUser());
  }, [])

  return (
    <>
      <Route exact path="/" component={Main} />
      <Route exact path="/signup-login" component={Login} />
      <ProtectedRoute exact path="/userdashboard" component={UserDashboard} />
      <AdminProtectedRoute exact path="/admindashboard" component={AdminDashboard} />
    </>
  );
}

export default App;