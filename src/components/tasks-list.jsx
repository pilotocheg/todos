import React from 'react';
import PropTypes from 'prop-types';
import Task from './task';

/**
 * Contains list of rendered tasks
 */
const TasksList = ({
  list, filter, onEdit, onItemRemove, onCompletedToggle,
}) => (
  <section>
    <ul>{
      list.filter((item) => {
        if (filter === 'active') {
          return !item.completed;
        } else if (filter === 'completed') {
          return item.completed;
        }
        return true;
      }).map(item => (
        <Task
          {...item}
          key={item.id}
          onEdit={onEdit}
          onRemove={onItemRemove}
          onCompletedToggle={onCompletedToggle}
        />
      ))
    }
    </ul>
  </section>
);

TasksList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object), // an array of tasks
  filter: PropTypes.string, // filter param
  onEdit: PropTypes.func.isRequired, // func for changing task's value
  onItemRemove: PropTypes.func.isRequired, // removes task
  onCompletedToggle: PropTypes.func.isRequired, // toggles task's status
};

TasksList.defaultProps = {
  list: [],
  filter: 'all',
};

export default TasksList;
