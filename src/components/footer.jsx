import React from "react";
import PropTypes from "prop-types";
import FilterBtn from "./filter-btn";

/**
 * Footer contains tasks counter, clear all completed and filter buttons
 */
export default function Footer({
  tasksCount,
  uncompletedCount,
  completedCount,
  onFilterChange,
  onDeleteAllCompleted,
  filter,
}) {
  const letter = uncompletedCount === 1 ? "" : "s";

  return tasksCount ? (
    <section id="timer-footer">
      <span id="uncomplete-counter">
        {`${uncompletedCount} item${letter} left`}
      </span>
      <div id="buttons-div">
        <FilterBtn
          value="all"
          onFilterChange={onFilterChange}
          filter={filter}
        />
        <FilterBtn
          value="active"
          onFilterChange={onFilterChange}
          filter={filter}
        />
        <FilterBtn
          value="completed"
          onFilterChange={onFilterChange}
          filter={filter}
        />
      </div>
      <button
        className={`clear-all${completedCount ? " visible" : ""}`}
        onClick={onDeleteAllCompleted}
      >
        {" "}
        clear completed
      </button>
    </section>
  ) : null;
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired, // Changes filter value for tasks list
  onDeleteAllCompleted: PropTypes.func.isRequired, // deletes all completed tasks
  filter: PropTypes.string, // filter value
  tasksCount: PropTypes.number, // amount of all tasks
  uncompletedCount: PropTypes.number, // amount of uncompleted tasks
  completedCount: PropTypes.number, // amount of completed tasks
};

Footer.defaultProps = {
  filter: "all",
  tasksCount: 0,
  uncompletedCount: 0,
  completedCount: 0,
};
