import React, { useReducer } from 'react';
import TaskContext from './TaskContext';
import taskReducer from './TaskReducer';
import api from '../../utils/api';
import {
    GET_TASKS,
    GET_TASK,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    TASK_ERROR,
    CLEAR_TASK,
    CLEAR_ERRORS,
    SET_LOADING,
    FILTER_TASKS,
    CLEAR_FILTER,
} from './TaskReducer';

const TaskState = ({ children }) => {
    const initialState = {
        tasks: [],
        currentTask: null,
        filtered: null,
        error: null,
        loading: false,
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Get all tasks
    const getTasks = async () => {
        setLoading();
        try {
            const res = await api.get('/tasks');

            dispatch({
                type: GET_TASKS,
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response?.data?.message || 'Failed to fetch tasks',
            });
        }
    };

    // Get single task
    const getTask = async (id) => {
        setLoading();
        try {
            const res = await api.get(`/tasks/${id}`);

            dispatch({
                type: GET_TASK,
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response?.data?.message || 'Failed to fetch task',
            });
        }
    };

    // Add task
    const addTask = async (task) => {
        setLoading();
        try {
            const res = await api.post('/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: res.data.data,
            });

            return res.data.data;
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response?.data?.message || 'Failed to add task',
            });
        }
    };

    // Update task
    const updateTask = async (id, task) => {
        setLoading();
        try {
            const res = await api.put(`/tasks/${id}`, task);

            dispatch({
                type: UPDATE_TASK,
                payload: res.data.data,
            });

            return res.data.data;
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response?.data?.message || 'Failed to update task',
            });
        }
    };

    // Delete task
    const deleteTask = async (id) => {
        setLoading();
        try {
            await api.delete(`/tasks/${id}`);

            dispatch({
                type: DELETE_TASK,
                payload: id,
            });
        } catch (err) {
            dispatch({
                type: TASK_ERROR,
                payload: err.response?.data?.message || 'Failed to delete task',
            });
        }
    };

    // Clear current task
    const clearTask = () => {
        dispatch({ type: CLEAR_TASK });
    };

    // Filter tasks
    const filterTasks = (text) => {
        dispatch({
            type: FILTER_TASKS,
            payload: text,
        });
    };

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Set loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING });
    };

    // Clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                currentTask: state.currentTask,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getTasks,
                getTask,
                addTask,
                updateTask,
                deleteTask,
                clearTask,
                filterTasks,
                clearFilter,
                clearErrors,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskState;