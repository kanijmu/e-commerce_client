import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Loading';
import UseAdmin from '../Deshboard/Hooks/UseAdmin';
import auth from '../firebase.init';
const RequireAdmin = ({children}) => {
     const [user, loading] = useAuthState(auth);
     const [admin,adminLoading]=UseAdmin(user);
     const location=useLocation();
     if (loading || adminLoading) {
          return <Loading/>
        }
        if(!user || !admin){
          return <Navigate to="/login" state={{ from: location }} replace></Navigate>
        }
     return children;
};
export default RequireAdmin;