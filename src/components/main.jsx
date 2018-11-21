import React, { Component } from 'react';
import Task from './task';
import FilterBtn from './footer';
import Header from './header';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      filter: 'all',
    };

    this.onItemAdd = this.onItemAdd.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.onCompletedToggle = this.onCompletedToggle.bind(this);
    this.handleAllComplete = this.handleAllComplete.bind(this);
  }

  componentWillMount() {
    if (localStorage.myTodo) {
      const localState = JSON.parse(localStorage.getItem('myTodo'));
      if (Array.isArray(localState.list)) {
        this.setState(localState);
      }
    }
  }
  componentDidUpdate() {
    localStorage.setItem('myTodo', JSON.stringify(this.state));
  }
  onItemAdd(e) {
    if (e.keyCode === 13 && e.target.value.trim()) {
      this.setState(({ list }) => ({
        list: list.concat({
          value: e.target.value,
          id: Date.now(),
          completed: false,
        }),
      }));
      e.target.value = '';
    }
  }
  onTextChange(id, text) {
    if (text) {
      this.setState(({ list }) => ({
        list: list.map((item) => {
          if (item.id === id) {
            item.value = text;
          }
          return item;
        }),
      }));
    } else {
      this.onItemRemove(id);
    }
  }

  onItemRemove(id) {
    this.setState(({ list }) => ({
      list: list.filter(item => item.id !== id),
    }));
  }

  onCompletedToggle(id) {
    this.setState(({ list }) => ({
      list: list.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      }),
    }));
  }

  handleAllComplete(e) {
    const { list } = this.state;
    if (!list.some(item => !item.completed)) {
      e.target.checked = false;
    }

    this.setState({
      list: list.map((item) => {
        item.completed = e.target.checked;
        return item;
      }),
    });
  }

  clearCompleted() {
    this.setState(({ list }) => ({
      list: list.filter(item => !item.completed),
    }));
  }

  filterItems(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  render() {
    const { list, filter } = this.state;
    const notCompletedLength = list.filter(item => !item.completed).length;
    return (
      <div id="main-app">
        <h1 id="header">my todos</h1>
        <div id="app-body">
          <Header
            onItemAdd={this.onItemAdd}
            handleAllComplete={this.handleAllComplete}
            listLength={list.length}
            notCompletedLength={notCompletedLength}
          />
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
                  value={item.value}
                  id={item.id}
                  key={item.id}
                  onToggle={this.onCompletedToggle.bind(this, item.id)}
                  onRemove={this.onItemRemove.bind(this, item.id)}
                  onTextChange={this.onTextChange.bind(this)}
                  completed={item.completed}
                  display={item.display}
                />
              ))
            }
            </ul>
          </section>
        </div>
        {
          list.length ? (
            <section id="timer-footer">
              <span id="uncomplete-counter">
                { notCompletedLength } &nbsp;
                { notCompletedLength === 1 ? 'item left' : 'items left' }
              </span>
              <div id="buttons-div">
                <FilterBtn id="all-btn" value="all" filterItems={this.filterItems} />
                <FilterBtn id="active-btn" value="active" filterItems={this.filterItems} />
                <FilterBtn id="completed-btn" value="completed" filterItems={this.filterItems} />
              </div>
              {
                this.state.list.filter(item => item.completed).length ?
                  <button
                    id="clear-all"
                    onClick={this.clearCompleted.bind(this)}
                  >clear completed
                  </button> : null
              }
            </section>
          ) : null
        }
      </div>
    );
  }
}
