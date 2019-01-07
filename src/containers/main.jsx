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
      this.props.onTodoCreateAction({
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
    const { list, onToggleAllCompleteAction } = this.props;
    if (!list.some(item => !item.completed)) {
      e.target.checked = false;
    }
    onToggleAllCompleteAction(e.target.checked);
  }

  render() {
    const {
      list,
      filter,
      onTodoEditAction,
      onTodoDeleteAction,
      onFilterChangeAction,
      onToggleCompleteTodoAction,
      onDeleteAllCompletedAction,
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
            onEdit={onTodoEditAction}
            onItemRemove={onTodoDeleteAction}
            onCompletedToggle={onToggleCompleteTodoAction}
          />
        </div>
        <Footer
          filter={filter}
          tasksCount={list.length}
          completedCount={completedCount}
          uncompletedCount={uncompletedCount}
          setFilter={onFilterChangeAction}
          clearCompleted={onDeleteAllCompletedAction}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({ ...store });

const mapDispatchToProps = dispatch => ({
  onTodoCreateAction: todo => dispatch(createTodoAction(todo)),
  onTodoEditAction: todo => dispatch(editTodoAction(todo)),
  onTodoDeleteAction: id => dispatch(deleteTodoAction(id)),
  onToggleCompleteTodoAction: id => dispatch(toggleCompleteTodoAction(id)),
  onFilterChangeAction: filter => dispatch(changeFilterAction(filter)),
  onToggleAllCompleteAction: value => dispatch(toggleAllCompleteAction(value)),
  onDeleteAllCompletedAction: () => dispatch(deleteAllCompletedAction()),
});

Main.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  onTodoCreateAction: PropTypes.func.isRequired,
  onTodoDeleteAction: PropTypes.func.isRequired,
  onTodoEditAction: PropTypes.func.isRequired,
  onToggleCompleteTodoAction: PropTypes.func.isRequired,
  onFilterChangeAction: PropTypes.func.isRequired,
  onToggleAllCompleteAction: PropTypes.func.isRequired,
  onDeleteAllCompletedAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
