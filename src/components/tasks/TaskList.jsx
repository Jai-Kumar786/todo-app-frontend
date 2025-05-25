import React, { useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TaskItem from './TaskItem';
import Spinner from '../ui/Spinner';
import TaskContext from '../../context/task/TaskContext';

const TaskList = () => {
    const taskContext = useContext(TaskContext);
    const { tasks, filtered, getTasks, loading, filterTasks, clearFilter } = taskContext;

    const [filterText, setFilterText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [sortBy, setSortBy] = useState('dateDesc');

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, []);

    const onFilterTextChange = (e) => {
        setFilterText(e.target.value);
        if (e.target.value !== '') {
            filterTasks(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const onFilterPriorityChange = (e) => {
        setFilterPriority(e.target.value);
    };

    const onSortChange = (e) => {
        setSortBy(e.target.value);
    };

    // Filter and sort tasks
    const getFilteredAndSortedTasks = () => {
        let filteredTasks = filtered !== null ? filtered : tasks;

        // Apply status filter
        if (filterStatus !== 'all') {
            const isCompleted = filterStatus === 'completed';
            filteredTasks = filteredTasks.filter(
                (task) => task.isCompleted === isCompleted
            );
        }

        // Apply priority filter
        if (filterPriority !== 'all') {
            filteredTasks = filteredTasks.filter(
                (task) => task.priority === filterPriority
            );
        }

        // Apply sorting
        const sortedTasks = [...filteredTasks];
        switch (sortBy) {
            case 'titleAsc':
                return sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
            case 'titleDesc':
                return sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
            case 'dateAsc':
                return sortedTasks.sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
            case 'dateDesc':
                return sortedTasks.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            case 'priorityHigh':
                return sortedTasks.sort((a, b) => {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                });
            case 'priorityLow':
                return sortedTasks.sort((a, b) => {
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                });
            case 'dueDate':
                return sortedTasks.sort((a, b) => {
                    if (!a.dueDate) return 1;
                    if (!b.dueDate) return -1;
                    return new Date(a.dueDate) - new Date(b.dueDate);
                });
            default:
                return sortedTasks;
        }
    };

    if (loading) {
        return <Spinner />;
    }

    const filteredAndSortedTasks = getFilteredAndSortedTasks();

    return (
        <>
            <div className="task-filter">
                <div className="filter-group">
                    <input
                        type="text"
                        placeholder="Filter tasks..."
                        value={filterText}
                        onChange={onFilterTextChange}
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <label htmlFor="statusFilter">Status</label>
                        <select
                            id="statusFilter"
                            value={filterStatus}
                            onChange={onFilterStatusChange}
                        >
                            <option value="all">All</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="priorityFilter">Priority</label>
                        <select
                            id="priorityFilter"
                            value={filterPriority}
                            onChange={onFilterPriorityChange}
                        >
                            <option value="all">All</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sortBy">Sort By</label>
                        <select id="sortBy" value={sortBy} onChange={onSortChange}>
                            <option value="dateDesc">Newest First</option>
                            <option value="dateAsc">Oldest First</option>
                            <option value="titleAsc">Title (A-Z)</option>
                            <option value="titleDesc">Title (Z-A)</option>
                            <option value="priorityHigh">Priority (High-Low)</option>
                            <option value="priorityLow">Priority (Low-High)</option>
                            <option value="dueDate">Due Date</option>
                        </select>
                    </div>
                </div>
            </div>

            {tasks.length === 0 ? (
                <p className="no-tasks">No tasks to show. Add a task to get started!</p>
            ) : filteredAndSortedTasks.length === 0 ? (
                <p className="no-tasks">No tasks match your filters</p>
            ) : (
                <TransitionGroup className="task-list">
                    {filteredAndSortedTasks.map((task) => (
                        <CSSTransition key={task._id} timeout={500} classNames="item">
                            <TaskItem task={task} />
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            )}
        </>
    );
};

export default TaskList;