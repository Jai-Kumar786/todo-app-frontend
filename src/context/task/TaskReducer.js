export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TASK_ERROR = 'TASK_ERROR';
export const CLEAR_TASK = 'CLEAR_TASK';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const SET_LOADING = 'SET_LOADING';
export const FILTER_TASKS = 'FILTER_TASKS';
export const CLEAR_FILTER = 'CLEAR_FILTER';

const taskReducer = (state, action) => {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false,
            };
        case GET_TASK:
            return {
                ...state,
                currentTask: action.payload,
                loading: false,
            };
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false,
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task._id === action.payload._id ? action.payload : task
                ),
                loading: false,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== action.payload),
                loading: false,
            };
        case CLEAR_TASK:
            return {
                ...state,
                currentTask: null,
            };
        case FILTER_TASKS:
            return {
                ...state,
                filtered: state.tasks.filter((task) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return task.title.match(regex) || task.description.match(regex);
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default taskReducer;