import { defineAction } from 'redux-define';

export const TODO_ADD = defineAction('TODO_ADD', []);
export const TODO_DELETE = defineAction('TODO_DELETE', []);
export const TODO_EDIT = defineAction('TODO_EDIT', []);
export const TODO_COMPLETE = defineAction('TODO_COMPLETE', []);
export const TODO_COMPLETE_ALL = defineAction('TODO_COMPLETE_ALL', []);
export const TODO_CLEAR_COMPLETED = defineAction('TODO_CLEAR_COMPLETED', []);