import { createAction } from 'redux-actions';
import * as ActionType from '../constants/ActionType';

export const addTodo = createAction(ActionType.TODO_ADD);
export const deleteTodo = createAction(ActionType.TODO_DELETE);
export const editTodo = createAction(ActionType.TODO_EDIT, (id, text) => ({id, text}));
export const completeTodo = createAction(ActionType.TODO_COMPLETE);
export const completeAll = createAction(ActionType.TODO_COMPLETE_ALL);
export const clearCompleted = createAction(ActionType.TODO_CLEAR_COMPLETED);