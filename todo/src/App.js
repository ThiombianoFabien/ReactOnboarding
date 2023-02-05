import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner";
import { TodoRow } from "./TodoRow";
import { TodoCreator } from "./TodoCreator";
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Adam",
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false },
      ],
      showCompleted: true,
      // newItems: "",
    };
  }

  updateNewTextValue = (event) => {
    this.setState({ newItems: event.target.value });
  };

  // createNewTodo = () => {
  //   if (!this.state.todoItems.find((item) => item.action === this.state.newItems)) {
  //     this.setState({
  //       todoItems: [...this.state.todoItems, { action: this.state.newItems, done: false }],
  //       newItems: "",
  //     });
  //   }
  // };

  createNewTodo = (task) => {
    if (!this.state.todoItems.find((item) => item.action === task.action)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }],
      });
    }
  };

  changeStateData = () => {
    this.setState({
      username: this.state.username === "Adam" ? "Bob" : "Adam",
    });
  };

  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) => (item.action === todo.action ? { ...item, done: !item.done } : item)),
    });

  // todoTableRows = () =>
  //   this.state.todoItems.map((item) => (
  //     <tr key={item.action}>
  //       <td>{item.action}</td>
  //       <td>
  //         <input type="checkbox" checked={item.done} onChange={() => this.toggleTodo(item)} />
  //       </td>
  //     </tr>
  //   ));

  // todoTableRows = () => this.state.todoItems.map((item) => <TodoRow key={item.action} item={item} callback={this.toggleTodo}></TodoRow>);

  todoTableRows = (doneValue) => this.state.todoItems.filter((item) => item.done === doneValue).map((item) => <TodoRow key={item.action} item={item} callback={this.toggleTodo}></TodoRow>);

  render = () => (
    <div>
      <TodoBanner name={this.state.username} tasks={this.state.todoItems}></TodoBanner>
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks" isChecked={this.showCompleted} callback={(checked) => this.setState({ showCompleted: checked })} />
        </div>
      </div>
      {this.state.showCompleted && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
        </table>
      )}
    </div>
  );
  // render = () => (
  //   <div>
  //     <h4 className="bg-primary text-white text-center p-2">
  //       {this.state.username}'s To Do List ({this.state.todoItems.filter((t) => !t.done).length} items to do)
  //     </h4>
  //     <div className="container-fluid">
  //       <div className="my-1">
  //         <input className="form-control" value={this.state.newItemText} onChange={this.updateNewTextValue} />
  //         <button className="btn btn-primary mt-1" onClick={this.createNewTodo}>
  //           Add
  //         </button>
  //       </div>
  //       <table className="table table-striped table-bordered">
  //         <thead>
  //           <tr>
  //             <th>Description</th>
  //             <th>Done</th>
  //           </tr>
  //         </thead>
  //         <tbody>{this.todoTableRows()}</tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
