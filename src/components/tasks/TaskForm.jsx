import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/task/TaskContext';
import Alert from '../ui/Alert';

const TaskForm = () => {
    const taskContext = useContext(TaskContext);
    const { addTask, updateTask, currentTask, clearTask } = taskContext;

    const [task, setTask] = useState({
        title: '',
        description: '',
        priority: 'medium',
        isCompleted: false,
        dueDate: '',
    });

    const [alert, setAlert] = useState(null);

    useEffect(() => {
        if (currentTask !== null) {
            setTask({
                title: currentTask.title,
                description: currentTask.description || '',
                priority: currentTask.priority,
                isCompleted: currentTask.isCompleted,
                dueDate: currentTask.dueDate ? new Date(currentTask.dueDate).toISOString().split('T')[0] : '',
            });
        } else {
            setTask({
                title: '',
                description: '',
                priority: 'medium',
                isCompleted: false,
                dueDate: '',
            });
        }
    }, [currentTask, taskContext]);

    const { title, description, priority, isCompleted, dueDate } = task;

    const onChange = (e) =>
        setTask({ ...task, [e.target.name]: e.target.value });

    const onCheckboxChange = (e) =>
        setTask({ ...task, [e.target.name]: e.target.checked });

    const onSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            setAlert({ type: 'danger', message: 'Please enter a title' });
            return;
        }

        const taskData = {
            title,
            description,
            priority,
            isCompleted,
            dueDate: dueDate || undefined,
        };

        if (currentTask === null) {
            addTask(taskData);
            setAlert({ type: 'success', message: 'Task added successfully' });
        } else {
            updateTask(currentTask._id, taskData);
            setAlert({ type: 'success', message: 'Task updated successfully' });
            clearTask();
        }

        setTask({
            title: '',
            description: '',
            priority: 'medium',
            isCompleted: false,
            dueDate: '',
        });

        // Clear the alert after 3 seconds
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const clearAll = () => {
        clearTask();
    };

    return (
        <form onSubmit={onSubmit} className="task-form">
            <h2 className="text-primary">
                {currentTask ? 'Edit Task' : 'Add Task'}
            </h2>

            {alert && <Alert type={alert.type} message={alert.message} />}

            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={onChange}
                    placeholder="Enter task title"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Enter task description"
                ></textarea>
            </div>

            <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                    name="priority"
                    id="priority"
                    value={priority}
                    onChange={onChange}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={dueDate}
                    onChange={onChange}
                />
            </div>

            <div className="form-group form-checkbox">
                <input
                    type="checkbox"
                    name="isCompleted"
                    id="isCompleted"
                    checked={isCompleted}
                    onChange={onCheckboxChange}
                />
                <label htmlFor="isCompleted">Completed</label>
            </div>

            <div className="form-buttons">
                <input
                    type="submit"
                    value={currentTask ? 'Update Task' : 'Add Task'}
                    className="btn btn-primary btn-block"
                />

                {currentTask && (
                    <button
                        type="button"
                        className="btn btn-light btn-block"
                        onClick={clearAll}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;