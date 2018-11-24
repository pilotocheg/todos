import React, { Component } from 'react';
import TasksList from './tasks-list';
import Footer from './footer';
import Header from './header';

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      list: [], // Tasks list
      filter: 'all', // Filter for tasks rendering
    };

    this.onEdit = this.onEdit.bind(this);
    this.onItemAdd = this.onItemAdd.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.onItemRemove = this.onItemRemove.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.onCompletedToggle = this.onCompletedToggle.bind(this);
    this.handleAllComplete = this.handleAllComplete.bind(this);
  }

  /**
   * Loading data from local storage before component will mount
   */
  componentWillMount() {
    if (localStorage.myTodo) {
      const localState = JSON.parse(localStorage.getItem('myTodo'));
      if (Array.isArray(localState.list)) {
        this.setState(localState);
      }
    }
  }

  /**
   * Write data to local storage on each update
   */
  componentDidUpdate() {
    localStorage.setItem('myTodo', JSON.stringify(this.state));
  }

  /**
   * Creates new task on enter key press
   * @param {*} event.nativeEvent event of keypress
   */
  onItemAdd({ nativeEvent }) {
    if (nativeEvent.keyCode === 13 && nativeEvent.target.value.trim()) {
      this.setState(({ list }) => ({
        list: list.concat({
          value: nativeEvent.target.value,
          id: Date.now(),
          completed: false,
        }),
      }), () => {
        nativeEvent.target.value = '';
      });
    }
  }

  /**
   * Edits task's value, when double clicking on it
   * @param {number} id task's id
   * @param {string} value textarea value
   */
  onEdit(id, value) {
    this.setState(({ list }) => ({
      list: list.map((item) => {
        if (item.id === id) {
          item.value = value;
        }
        return item;
      }),
    }));
  }

  /**
   * Removes task from state
   * @param {number} id task's id
   */
  onItemRemove(id) {
    this.setState(({ list }) => ({
      list: list.filter(item => item.id !== id),
    }));
  }

  /**
   * Toggles task's status between completed and uncompleted
   * @param {number} id task's id
   */
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

  /**
   * Changes filter for tasks list view
   * @param {*} e event of filter btn
   */
  setFilter(e) {
    this.setState({
      filter: e.target.value,
    });
  }

  /**
   * Deletes all completed tasks from state
   */
  clearCompleted() {
    this.setState(({ list }) => ({
      list: list.filter(item => !item.completed),
    }));
  }

  /**
   * Changes all task's statuses to 'completed'
   * @param {*} e event
   */
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

  render() {
    const { list, filter } = this.state;
    let uncompletedCount = 0;
    let completedCount = 0;
    list.forEach((item) => {
      if (item.completed) {
        completedCount += 1;
      } else {
        uncompletedCount += 1;
      }
    });
    return (
      <div id="main-app">
        <h1 id="header">my todos</h1>
        <div id="app-body">
          <Header
            onItemAdd={this.onItemAdd}
            handleAllComplete={this.handleAllComplete}
            tasksCount={list.length}
            uncompletedCount={uncompletedCount}
          />
          <TasksList
            list={list}
            filter={filter}
            onEdit={this.onEdit}
            onItemRemove={this.onItemRemove}
            onCompletedToggle={this.onCompletedToggle}
          />
        </div>
        <Footer
          filter={filter}
          tasksCount={list.length}
          completedCount={completedCount}
          uncompletedCount={uncompletedCount}
          setFilter={this.setFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
