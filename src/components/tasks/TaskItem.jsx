import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaTrash, FaCheck, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import TaskContext from '../../context/task/TaskContext';

const TaskItem = ({ task }) => {
    const taskContext = useContext(TaskContext);
    const { deleteTask, getTask, updateTask } = taskContext;
    const { _id, title, description, priority, isCompleted, dueDate } = task;

    const onDelete = () => {
        deleteTask(_id);
    };

    const onEdit = () => {
        getTask(_id);
    };

    const onToggleComplete = () => {
        updateTask(_id, { ...task, isCompleted: !isCompleted });
    };

    // Format date string
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    // Determine priority class
    const getPriorityClass = () => {
        switch (priority) {
            case 'high':
                return 'priority-high';
            case 'medium':
                return 'priority-medium';
            case 'low':
                return 'priority-low';
            default:
                return '';
        }
    };

    // Get priority icon
    const getPriorityIcon = () => {
        switch (priority) {
            case 'high':
                return <FaArrowUp className="icon-priority" />;
            case 'low':
                return <FaArrowDown className="icon-priority" />;
            default:
                return null;
        }
    };

    return (
        <div className={`task-item ${isCompleted ? 'completed' : ''}`}>
            <div className="task-content">
                <h3 className="task-title">
                    {title}
                    <span className={`badge ${getPriorityClass()}`}>
            {getPriorityIcon()} {priority}
          </span>
                </h3>

                {description && <p className="task-description">{description}</p>}

                {dueDate && (
                    <p className="task-due-date">
                        Due: {formatDate(dueDate)}
                    </p>
                )}
            </div>

            <div className="task-actions">
                <button
                    className={`btn-complete ${isCompleted ? 'completed' : ''}`}
                    onClick={onToggleComplete}
                >
                    <FaCheck />
                </button>

                <button className="btn-edit" onClick={onEdit}>
                    <FaEdit />
                </button>

                <button className="btn-delete" onClick={onDelete}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
};

export default TaskItem;