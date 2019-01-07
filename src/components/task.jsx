import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * This component contains new task with it's text value and update, delete, checkCompleted methods
 */
export default class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.showRedactor = this.showRedactor.bind(this);
    this.hideRedactor = this.hideRedactor.bind(this);
    this.hideRedactorWithKey = this.hideRedactorWithKey.bind(this);
  }

  /**
   * Show task redactor when double clicking on task element
   */
  showRedactor() {
    this.textarea.style.display = "block";
    this.textarea.focus();
  }

  /**
   * Hide task redactor
   */
  hideRedactor() {
    this.textarea.style.display = "none";

    const { value, onRemove } = this.props;
    if (!value) {
      onRemove();
    }
  }

  /**
   * Hide task redactor after pressing 'enter' or 'esc' keys
   * @param {*} e keypress event
   */
  hideRedactorWithKey(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.hideRedactor();
    }
  }

  render() {
    const {
      onCompletedToggle,
      completed,
      onRemove,
      onEdit,
      value,
      id,
    } = this.props;
    return (
      <li
        className={completed ? "completed" : null}
        onDoubleClick={this.showRedactor}
      >
        <button
          onClick={() => onCompletedToggle(id)}
          className={`complete-btn${completed ? " checked" : ""}`}
        >
          &#10003;
        </button>
        {value}
        <button onClick={() => onRemove(id)} className="delete-btn">
          &#10006;
        </button>
        <textarea
          className="textRedactor"
          value={value}
          onChange={e => onEdit({ id, value: e.target.value })}
          onBlur={this.hideRedactor}
          onKeyDown={this.hideRedactorWithKey}
          ref={textarea => {
            this.textarea = textarea;
          }}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  onCompletedToggle: PropTypes.func.isRequired, // toggles task status
  onRemove: PropTypes.func.isRequired, // deletes task
  onEdit: PropTypes.func.isRequired, // changes task text value
  id: PropTypes.number.isRequired, // unique id of the task
  value: PropTypes.string, // text value of the task
  completed: PropTypes.bool, // is task completed or not
};

TodoItem.defaultProps = {
  value: "",
  completed: false,
};
