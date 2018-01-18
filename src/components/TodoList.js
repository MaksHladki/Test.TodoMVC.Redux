import React from 'react';
import PropTypes from 'prop-types';

import Todo from '../models/Todo';
import TodoItem from './TodoItem';

class TodoList extends React.Component {

    render() {
        const { todos, actions } = this.props;
        
        return (
            <ul className="todo-list">
                {
                    todos.map((todo, index) => (
                        <TodoItem key={index} todo={todo} {...actions} />
                    ))
                }
            </ul>
        );
    }
    
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
    actions: PropTypes.object.isRequired
};

export default TodoList;