import React, { Component } from "react";
import styles from "./CardDetails.module.css";
import CloseIcon from "@mui/icons-material/Close";
import CheckList from "../checkList/CheckList";
import * as getData from "../../apiCalls";
import AddIcon from "@mui/icons-material/Add";

export default class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.refCheckList = React.createRef();
    this.state = {
      checkLists: [],
      showForm: false,
      newCheckList: "",
    };
  }

  componentDidMount() {
    getData
      .getCheckLists(this.props.id)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        this.setState({ checkLists: JSON.parse(text) });
      })
      .catch((err) => console.error(err));
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addCheckListHandler = (e) => {
    e.preventDefault();
    if (!this.state.newCheckList) return;
    getData
      .createCheckList(this.props.id, this.state.newCheckList)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text));
        const newCheckLists = [...this.state.checkLists];
        newCheckLists.push(JSON.parse(text));
        this.setState({ checkLists: newCheckLists });
      })
      .catch((err) => console.error(err));
  };

  render() {
    // console.log(this.props);
    return (
      <div
        ref={this.refCheckList}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.isEqualNode(this.refCheckList.current)) {
            this.props.hideCheckList();
          }
        }}
        className={styles.Modal}
      >
        <div className={styles.CheckList}>
          <div className={styles.Header}>
            <h2>{this.props.name}</h2>
            <button onClick={this.props.hideCheckList}>
              <CloseIcon />
            </button>
          </div>
          {this.state.showForm ? (
            <div className={styles.FormContainer}>
              <form className={styles.Form} onSubmit={this.addCheckListHandler}>
                <input
                  type="text"
                  value={this.state.newCheckList}
                  placeholder="Enter List Title"
                  onChange={(e) => {
                    this.setState({ newCheckList: e.target.value });
                  }}
                />
                <div className={styles.ButtonContainer}>
                  <button>Add CheckList</button>
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
          {this.state.checkLists.map((checkList) => (
            <CheckList {...checkList} key={checkList.id} />
          ))}
        </div>
      </div>
    );
  }
}
