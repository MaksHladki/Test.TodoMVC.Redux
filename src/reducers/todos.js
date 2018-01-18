import { handleActions } from 'redux-actions';

import Todo from '../models/Todo';
import * as ActionType from '../constants/ActionType';

const initialState = [];

const todoReducers = handleActions({
    [ActionType.TODO_ADD]: (state, action) => {
        return [...state, new Todo({ text: action.payload })]
    },
    [ActionType.TODO_DELETE]: (state, action) => {
        return state.filter(todo => todo.id !== action.payload)
    },
    [ActionType.TODO_EDIT]: (state, action) => {
        const { id, text } = action.payload;
        return state.map(todo => (todo.id === id) ? new Todo({ ...todo, text }) : todo)
    },
    [ActionType.TODO_COMPLETE]: (state, action) => {
        return state.map(todo => (todo.id === action.payload)
            ? new Todo({ ...todo, completed: !todo.completed })
            : todo)
    },
    [ActionType.TODO_COMPLETE_ALL]: (state) => {
        const allCompleted = state.every(todo => todo.completed);
        return state.map(todo => new Todo({
            ...todo,
            completed: !allCompleted
        }));
    },
    [ActionType.TODO_CLEAR_COMPLETED]: (state) => {
        return state.filter(todo => !todo.completed);
    }
}, initialState)

export default todoReducers;