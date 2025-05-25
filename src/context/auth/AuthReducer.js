export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

const authReducer = (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                error: null,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user, // ✅ Store user data from login/register response
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false,
                // Don't clear token/user on login/register fail
            };
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.type === 'AUTH_ERROR' ? action.payload : null,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default authReducer;