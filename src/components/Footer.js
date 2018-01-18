import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Link from './Link';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/FilterType';

const FILTER_TITLES = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
};

@autobind
class Footer extends React.Component {

    renderTodoCount(activeCount) {
        const itemWord = activeCount == 1 ? 'item' : 'items';

        return (
            <span className="todo-count">
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    }

    renderClearButton() {
        const { completedCount, onClearCompleted } = this.props;

        if (completedCount > 0) {
            return (
                <button className="clear-completed" onClick={onClearCompleted} >
                    Clear completed
                </button>
            );
        }
    }

    render() {
        const { filter: selectedFilter, activeCount, onShow } = this.props;

        return (
            <div className="footer">
                {this.renderTodoCount(activeCount)}
                <ul className="filters">
                    {Object.keys(FILTER_TITLES).map((filter, index) =>
                        <li key={index}>
                            <Link 
                                active={filter === selectedFilter}
                                onClick={() => onShow(filter)}
                            >
                                {FILTER_TITLES[filter]}
                            </Link>
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </div>
        );
    }
    
}

Footer.propTypes = {
    activeCount: PropTypes.number.isRequired,
    completedCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
};

export default Footer;