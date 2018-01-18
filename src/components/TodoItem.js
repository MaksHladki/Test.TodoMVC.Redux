import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

import TodoTextInput from './TodoTextInput';
import Todo from '../models/Todo';

@autobind
class TodoItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    handleSave(id, text) {
        if (text.length === 0) {
            this.props.deleteTodo(id);
        } else {
            this.props.editTodo(id, text);
        }

        this.setState({ editing: false });
    }

    handleDoubleClick() {
        this.setState({ editing: true });
    }

    renderEdit() {
        const { todo } = this.props;

        return (
            <TodoTextInput 
                text={todo.text}
                editing={this.state.editing}
                onSave={(text) => this.handleSave(todo.id, text)}
            />
        );
    }

    renderView() {
        const { todo, completeTodo, deleteTodo } = this.props;

        return (
            <div className="view">
                <input className="toggle" type="checkbox" checked={todo.completed} onChange={() => completeTodo(todo.id)} />
                <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)} />
            </div>
        );
    }

    render() {
        const { todo } = this.props;

        return (
            <li className={classnames({
                completed: todo.completed,
                editing: this.state.editing
            })}
            >
                {this.state.editing ? this.renderEdit() : this.renderView()}
            </li>
        );
    }
    
}

TodoItem.propTypes = {
    todo: PropTypes.instanceOf(Todo).isRequired,
    completeTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
};

export default TodoItem;