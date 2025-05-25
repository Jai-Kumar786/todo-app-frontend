import React, { useReducer, useEffect } from 'react';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import api from '../../utils/api';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERRORS,
} from './AuthReducer';

const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: !!localStorage.getItem('token'), // ✅ Fix: Check if token exists
        loading: !!localStorage.getItem('token'), // ✅ Only loading if we have a token to verify
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // ✅ Load user on app initialization
    useEffect(() => {
        console.log('AuthState useEffect - Token exists:', !!localStorage.getItem('token')); // Debug
        if (localStorage.getItem('token')) {
            loadUser();
        } else {
            // If no token, set loading to false
            dispatch({ type: AUTH_ERROR });
        }
    }, []);

    // Load User
    const loadUser = async () => {
        try {
            console.log('Loading user...'); // Debug
            const res = await api.get('/auth/me');
            console.log('User loaded successfully:', res.data); // Debug

            dispatch({
                type: USER_LOADED,
                payload: res.data.data, // Backend returns { success: true, data: user }
            });
        } catch (err) {
            console.error('Load user error:', err.response?.data); // Debug
            dispatch({ type: AUTH_ERROR });
        }
    };

    // Register User
    const register = async (formData) => {
        try {
            const res = await api.post('/auth/register', formData);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            // Don't call loadUser() here since we already have user data from register
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response?.data?.message || 'Registration failed',
            });
        }
    };

    // Login User
    const login = async (formData) => {
        try {
            console.log('Attempting login...'); // Debug
            const res = await api.post('/auth/login', formData);
            console.log('Login response:', res.data); // Debug

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            // Don't call loadUser() here since we already have user data from login
        } catch (err) {
            console.error('Login error:', err.response?.data); // Debug
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response?.data?.message || 'Login failed',
            });
        }
    };

    // Logout
    const logout = () => {
        console.log('Logging out...'); // Debug
        dispatch({ type: LOGOUT });
    };

    // Clear Errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                logout,
                loadUser,
                clearErrors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthState;