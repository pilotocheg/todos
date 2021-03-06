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

    const { value, onTodoDelete } = this.props;
    if (!value) {
      onTodoDelete();
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
      onToggleCompleteTodo,
      completed,
      onTodoDelete,
      onTodoEdit,
      value,
      id,
    } = this.props;
    return (
      <li
        className={completed ? "completed" : null}
        onDoubleClick={this.showRedactor}
      >
        <button
          onClick={() => onToggleCompleteTodo(id)}
          className={`complete-btn${completed ? " checked" : ""}`}
        >
          &#10003;
        </button>
        {value}
        <button onClick={() => onTodoDelete(id)} className="delete-btn">
          &#10006;
        </button>
        <textarea
          className="textRedactor"
          value={value}
          onChange={e => onTodoEdit({ id, value: e.target.value })}
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
  onToggleCompleteTodo: PropTypes.func.isRequired, // toggles task status
  onTodoDelete: PropTypes.func.isRequired, // deletes task
  onTodoEdit: PropTypes.func.isRequired, // changes task text value
  id: PropTypes.number.isRequired, // unique id of the task
  value: PropTypes.string, // text value of the task
  completed: PropTypes.bool, // is task completed or not
};

TodoItem.defaultProps = {
  value: "",
  completed: false,
};
