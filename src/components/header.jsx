import React from 'react';
import PropTypes from 'prop-types';

/**
 * Header of todo app. Includes input for typing new task and
 * checkbox for making all tasks completed
 */
const Header = ({
  onItemAdd, tasksCount, uncompletedCount, handleAllComplete,
}) => (
  <div id="for-input">
    <input
      id="input"
      onKeyDown={onItemAdd}
      placeholder="What needs to be done?"
    />
    {
      tasksCount ? (
        <div id="for-check-all">
          <label
            htmlFor="check-all"
            style={{ color: uncompletedCount ? '#e6e6e6' : '#737373' }}
          >❯
            <input
              id="check-all"
              type="checkbox"
              onChange={handleAllComplete}
            />
          </label>
        </div>
      ) : null
    }
  </div>
);

Header.propTypes = {
  handleAllComplete: PropTypes.func.isRequired, // makes all task completed
  onItemAdd: PropTypes.func.isRequired, // creates new task item
  tasksCount: PropTypes.number, // number of tasks
  uncompletedCount: PropTypes.number, // Amount of uncompleted tasks
};

Header.defaultProps = {
  tasksCount: 0,
  uncompletedCount: 0,
};

export default Header;
