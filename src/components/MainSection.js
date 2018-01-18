import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Footer from './Footer';
import TodoList from './TodoList';
import Todo from '../models/Todo';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/FilterType';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

@autobind
class MainSection extends React.Component {

    constructor(props) {
        super(props);

        this.state = { filter: SHOW_ALL };
    }

    handleClearCompleted() {
        this.props.actions.clearCompleted();
    }

    handleShow(filter) {
        this.setState({ filter })
    }

    renderToggleAll(completedCount) {
        const { todos, actions } = this.props;
        if (todos.length > 0) {
            return (
                <span>
                    <input className="toggle-all"
                        type="checkbox"
                        onChange={() => actions.completeAll()}
                        checked={completedCount === todos.length}
                    />
                    <label htmlFor="toggle-all" onClick={() => actions.completeAll()}>
                        Mark all as complete
                    </label>
                </span>
            )
        }
    }

    renderFooter(completedCount) {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    onClearCompleted={this.handleClearCompleted}
                    onShow={this.handleShow}
                />
            );
        }
    }

    render() {
        const { todos, actions } = this.props
        const { filter } = this.state;

        const filteredTodos = todos.filter(TODO_FILTERS[filter]);
        const completedCount = todos.reduce((count, todo) =>
            todo.completed ? count + 1 : count,
            0
        );

        return (
            <section className="main">
                {this.renderToggleAll(completedCount)}
                <TodoList todos={filteredTodos} actions={actions} />
                {this.renderFooter(completedCount)}
            </section>
        );
    }

}

MainSection.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
    actions: PropTypes.PropTypes.object.isRequired
};

export default MainSection;