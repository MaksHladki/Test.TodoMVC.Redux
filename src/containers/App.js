import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MainSection from '../components/MainSection';
import Header from '../components/Header';
import * as TodoAction from '../actions';
import Todo from '../models/Todo';

class App extends React.Component {
    render() {
        const { todos, actions } = this.props;

        return (
            <div className="todoapp">
                <Header addTodo={actions.addTodo} />
                <MainSection todos={todos} actions={actions} />
            </div>
        )
    }
}

App.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.instanceOf(Todo)).isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    todos: state.todos
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);