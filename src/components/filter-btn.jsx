import React from 'react';
import PropTypes from 'prop-types';

const FilterBtn = ({ setFilter, value, filter }) => {
  const className = filter === value ? 'checked' : '';

  return (
    <button
      className={className}
      value={value}
      onClick={setFilter}
    >
      {value}
    </button>
  );
};

FilterBtn.propTypes = {
  value: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default FilterBtn;
