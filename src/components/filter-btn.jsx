import React from "react";
import PropTypes from "prop-types";

const FilterBtn = ({ onFilterChange, value, filter }) => {
  const className = filter === value ? "checked" : "";

  return (
    <button
      className={className}
      value={value}
      onClick={e => onFilterChange(e.target.value)}
    >
      {value}
    </button>
  );
};

FilterBtn.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default FilterBtn;
