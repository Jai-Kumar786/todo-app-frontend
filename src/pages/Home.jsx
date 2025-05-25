import React, { useContext, useEffect } from 'react';
import TaskForm from '../components/tasks/TaskForm';
import TaskList from '../components/tasks/TaskList';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        if (localStorage.token) {
            loadUser();
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="home-container">
            <div className="task-grid">
                <div className="task-form-container">
                    <TaskForm />
                </div>
                <div className="task-list-container">
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default Home;