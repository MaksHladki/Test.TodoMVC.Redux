import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import TodoTextInput from './TodoTextInput';

@autobind
class Header extends React.Component {

    handleSave(text) {
        if (text) {
            this.props.addTodo(text)
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <TodoTextInput
                    newTodo
                    onSave={this.handleSave}
                    placeholder="What needs to be done?"
                />
            </header>
        );
    }
    
}

Header.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export default Header;