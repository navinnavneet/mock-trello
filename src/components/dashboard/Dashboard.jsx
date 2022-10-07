import { Component } from "react";
import styles from "./Dashboard.module.css";
import * as getData from "../../apiCalls";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import List from "../list/List";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      showForm: false,
      newList: "",
    };
  }
  componentDidMount() {
    getData
      .getLists()
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({ lists: JSON.parse(text) });
      })
      .catch((err) => console.error(err));
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addListHandler = (e) => {
    e.preventDefault();
    if (!this.state.newList) return;
    getData
      .createList(this.state.newList)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text));
        const newList = [...this.state.lists];
        newList.push(JSON.parse(text));
        this.setState({ lists: newList });
      })
      .catch((err) => console.error(err));
    this.setState({ newList: "" });
  };

  deleteListHandler = (id) => {
    getData
      .deleteList(id)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text), "no err");
        const newLists = this.state.lists.filter((list) => list.id !== id);
        this.setState({ lists: newLists });
      })
      .catch((err) => console.error(err, "err"));
  };
  render() {
    return (
      <div className={styles.Dashboard}>
        {this.state.lists.map((list, i) => {
          return (
            <List key={i} {...list} handleDelete={this.deleteListHandler} />
          );
        })}
        {this.state.showForm ? (
          <div className={styles.FormContainer}>
            <form className={styles.Form} onSubmit={this.addListHandler}>
              <input
                type="text"
                value={this.state.newList}
                placeholder="Enter List Title"
                onChange={(e) => {
                  this.setState({ newList: e.target.value });
                }}
              />
              <div className={styles.ButtonContainer}>
                <button>Add List</button>
                <CloseIcon
                  onClick={this.toggleForm}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </form>
          </div>
        ) : (
          <div className={styles.FormContainer}>
            <div className={styles.AddForm} onClick={this.toggleForm}>
              <AddIcon />
              <p>Add another list</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
