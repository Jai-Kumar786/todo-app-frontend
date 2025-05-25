import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import PrivateRoute from './components/routing/PrivateRoute';

// Pages
import Home from './pages/Home';
import Landing from './pages/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Context
import AuthState from './context/auth/AuthState';
import TaskState from './context/task/TaskState';

// Styles
import './App.css';

const App = () => {
    return (
        <AuthState>
            <TaskState>
                <Router>
                    <div className="App">
                        <Header />
                        <div className="container">
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <PrivateRoute>
                                            <Home />
                                        </PrivateRoute>
                                    }
                                />
                                <Route path="/landing" element={<Landing />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </div>
                        <Footer />
                        <ToastContainer position="bottom-right" />
                    </div>
                </Router>
            </TaskState>
        </AuthState>
    );
};

export default App;