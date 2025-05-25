import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Spinner from '../ui/Spinner';

const PrivateRoute = ({ children }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading, loadUser } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return isAuthenticated ? children : <Navigate to='/login' />;
};

export default PrivateRoute;