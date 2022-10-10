import { Component } from "react";
import styles from "./CheckList.module.css";
import * as getData from "../../apiCalls";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkItems: [],
      showForm: false,
      newCheckItem: "",
    };
  }

  componentDidMount() {
    getData
      .getCheckListItems(this.props.id)
      .then((response) => {
        // console.log(`Response: ${response.s/tatus} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text));
        this.setState({ checkItems: JSON.parse(text) });
      })
      .catch((err) => console.error(err));
  }

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  addCheckItemHandler = (e) => {
    e.preventDefault();
    if (!this.state.newCheckItem) return;
    getData
      .createCheckItem(this.props.id, this.state.newCheckItem)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(JSON.parse(text));
        const newCheckItems = [...this.state.checkItems];
        newCheckItems.push(JSON.parse(text));
        this.setState({ checkItems: newCheckItems, newCheckItem: "" });
      })
      .catch((err) => console.error(err));
  };

  render() {
    // console.log(this.props);
    return (
      <fieldset className={styles.CheckList}>
        <legend>{this.props.name}</legend>
        {this.state.checkItems.map((item, i) => {
          return (
            <div key={i}>
              <input type="checkbox" name={item.name} />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          );
        })}
        {this.state.showForm ? (
          <div className={styles.FormContainer}>
            <form className={styles.Form} onSubmit={this.addCheckItemHandler}>
              <input
                type="text"
                value={this.state.newCheckItem}
                placeholder="Enter List Title"
                onChange={(e) => {
                  this.setState({ newCheckItem: e.target.value });
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
      </fieldset>
    );
  }
}
