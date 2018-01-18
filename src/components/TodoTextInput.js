import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autobind from 'autobind-decorator';
import { KEY_RETURN } from 'keycode-js';

@autobind
class TodoTextInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: props.text
        };
    }
    
    handleChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleBlur(e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value)
        }
    }

    handleSubmit(e) {
        const text = e.target.value.trim();

        if (e.which === KEY_RETURN) {
            this.props.onSave(text)
            if (this.props.newTodo) {
                this.setState({ text: '' })
            }
        }
    }

    render() {
        const { editing, newTodo, placeholder } = this.props;

        return (
            <input className={
                classnames({
                    edit: editing,
                    'new-todo': newTodo
                })}
                type="text"
                placeholder={placeholder}
                autoFocus="true"
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        );
    }
    
}

TodoTextInput.propTypes = {
    text: PropTypes.string,
    placeholder: PropTypes.string,
    newTodo: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    onSave: PropTypes.func.isRequired,
};

TodoTextInput.defaultProps = {
    text: '',
    editing: false,
    newTodo: false,
};

export default TodoTextInput;