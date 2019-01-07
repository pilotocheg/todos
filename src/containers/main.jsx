import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksList from "../components/tasks-list";
import Footer from "../components/footer";
import Header from "../components/header";
import {
  createTodoAction,
  editTodoAction,
  deleteTodoAction,
  changeFilterAction,
  toggleAllCompleteAction,
  toggleCompleteTodoAction,
  deleteAllCompletedAction,
} from "../actions";

class Main extends Component {
  constructor() {
    super();

    this.onItemAdd = this.onItemAdd.bind(this);
    this.handleAllComplete = this.handleAllComplete.bind(this);
  }

  /**
   * Write data to local storage on each update
   */
  componentDidUpdate() {
    const { list, filter } = this.props;
    localStorage.setItem("myTodo", JSON.stringify({ list, filter }));
  }

  /**
   * Creates new task on enter key press
   * @param {object} event.nativeEvent event of keypress
   */
  onItemAdd({ nativeEvent }) {
    if (nativeEvent.keyCode === 13 && nativeEvent.target.value.trim()) {
      this.props.onTodoCreate({
        value: nativeEvent.target.value,
        id: Date.now(),
        completed: false,
      });
      nativeEvent.target.value = "";
    }
  }

  /**
   * Changes all task's statuses to 'completed'
   * @param {object} e event
   */
  handleAllComplete(e) {
    const { list, onToggleAllComplete } = this.props;
    if (!list.some(item => !item.completed)) {
      e.target.checked = false;
    }
    onToggleAllComplete(e.target.checked);
  }

  render() {
    const {
      list,
      filter,
      onTodoEdit,
      onTodoDelete,
      onFilterChange,
      onToggleCompleteTodo,
      onDeleteAllCompleted,
    } = this.props;

    let uncompletedCount = 0;
    let completedCount = 0;
    list.forEach(item => {
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
            onTodoEdit={onTodoEdit}
            onTodoDelete={onTodoDelete}
            onToggleCompleteTodo={onToggleCompleteTodo}
          />
        </div>
        <Footer
          filter={filter}
          tasksCount={list.length}
          completedCount={completedCount}
          uncompletedCount={uncompletedCount}
          onFilterChange={onFilterChange}
          onDeleteAllCompleted={onDeleteAllCompleted}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({ ...store });

const mapDispatchToProps = dispatch => ({
  onTodoCreate: todo => dispatch(createTodoAction(todo)),
  onTodoEdit: todo => dispatch(editTodoAction(todo)),
  onTodoDelete: id => dispatch(deleteTodoAction(id)),
  onToggleCompleteTodo: id => dispatch(toggleCompleteTodoAction(id)),
  onFilterChange: filter => dispatch(changeFilterAction(filter)),
  onToggleAllComplete: value => dispatch(toggleAllCompleteAction(value)),
  onDeleteAllCompleted: () => dispatch(deleteAllCompletedAction()),
});

Main.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  onTodoCreate: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
  onToggleCompleteTodo: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onToggleAllComplete: PropTypes.func.isRequired,
  onDeleteAllCompleted: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
