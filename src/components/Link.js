import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autobind from 'autobind-decorator';

@autobind
class Link extends React.Component {

    render() {
        const { active, children, onClick } = this.props;

        return (
            <a
                className={classnames({ selected: active })}
                style={{ cursor: 'pointer' }}
                onClick={(e) => { e.preventDefault(); onClick(); }}
            >
                {children}
            </a>
        );
    }

}

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

Link.defaultProps = {
    active: false
};

export default Link;