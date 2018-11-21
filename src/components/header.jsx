import React from 'react';
import PropTypes from 'prop-types';

/**
 * Header of todo app. Includes input for typing new task and
 * checkbox for making all tasks completed
 */
const Header = ({
  onItemAdd, listLength, notCompletedLength, handleAllComplete,
}) => (
  <div id="for-input">
    <input
      id="input"
      type="text"
      onKeyDown={onItemAdd}
      placeholder="What needs to be done?"
    />
    {
      listLength ? (
        <div id="for-check-all">
          <label
            htmlFor="check-all"
            style={{ color: notCompletedLength ? '#e6e6e6' : '#737373' }}
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
  listLength: PropTypes.number, // number of tasks
  notCompletedLength: PropTypes.number, // Amount of uncompleted tasks
};

Header.defaultProps = {
  listLength: 0,
  notCompletedLength: 0,
};

export default Header;
