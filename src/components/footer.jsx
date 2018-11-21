import React, { Component } from 'react';

export default class FilterBtn extends Component {
  render() {
    return (
      <button
        styles={{
 borderColor:
          this.props.display == this.props.value ? 'rgba(175, 47, 47, 0.2)' : 'none',
}}
        value={this.props.value}
        onClick={this.props.filterItems}
        id={this.props.id}
      >{ this.props.value }
      </button>
    );
  }
}
