import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../shared/Loading/Loading';
import { Navigate, useLocation, } from 'react-router';

const PrivateRoute = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation();

    if (loading) {
        return <Loading></Loading>  
    }
    if (!user || !user.email) {
        return <Navigate to='/login' state={{from: location.pathname}}></Navigate>
    }
    

    return children;
};

export default PrivateRoute;