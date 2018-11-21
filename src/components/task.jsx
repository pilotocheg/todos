import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends Component {
  constructor() {
    super();

    this.state = {
      isRedactor: false,
    };
  }
  componentWillMount() {
    this.setState({
      text: this.props.value,
    });
  }
  toggleTextRedactor() {
    this.setState({
      isRedactor: true,
    }, () => {
      this.textarea.focus();
    });
  }

  textRedactorBlur() {
    this.setState({
      isRedactor: false,
    });
  }

  getTextData(e) {
    this.setState({
      text: e.target.value,
    });
  }

  pushTextDataOnBlur() {
    this.textRedactorBlur();
    this.props.onTextChange(this.props.id, this.state.text);
  }

  pushTextData(e) {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.pushTextDataOnBlur();
    }
  }

  render() {
    return (
      <li
        style={{
          textDecoration: this.props.completed ? 'line-through' : 'none',
          color: this.props.completed ? '#d9d9d9' : '#4d4d4d',
          display: this.props.display,
        }}
        onDoubleClick={this.toggleTextRedactor.bind(this)}
      >
        <button
          onClick={this.props.onToggle}
          id="complete-btn"
          style={{
            color: this.props.completed ? '#5dc2af' : 'transparent',
            border: this.props.completed ? '1px solid #5dc2af' : '1px solid #e6e6e6',
          }}
        >&#10003;
        </button>
        { this.props.value }
        <button
          onClick={this.props.onRemove}
          id="delete-btn"
        >&#10006;
        </button>
        <textarea
          ref={e => this.textarea = e}
          id="textRedactor"
          type="text"
          value={this.state.text}
          onChange={this.getTextData.bind(this)}
          onKeyDown={
            this.pushTextData.bind(this)
          }
          onBlur={this.pushTextDataOnBlur.bind(this)}
          style={{ display: this.state.isRedactor ? 'block' : 'none' }}
        />
      </li>
    );
  }
}

TodoItem.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
  onRemove: PropTypes.func,
};
