import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing-inner">
                <h1>TodoApp</h1>
                <p>A simple and effective task management application</p>
                <div className="buttons">
                    <Link to="/register" className="btn btn-primary">
                        Register
                    </Link>
                    <Link to="/login" className="btn btn-light">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;