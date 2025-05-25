import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import Alert from '../ui/Alert';

const Register = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const [alert, setAlert] = useState(null);

    const { name, email, password, password2 } = user;

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        if (error) {
            setAlert({ type: 'danger', message: error });
            clearErrors();
        }
    }, [error, isAuthenticated, navigate, clearErrors]);

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setAlert({ type: 'danger', message: 'Please enter all fields' });
        } else if (password !== password2) {
            setAlert({ type: 'danger', message: 'Passwords do not match' });
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            {alert && <Alert type={alert.type} message={alert.message} />}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        id="password2"
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </div>
    );
};

export default Register;