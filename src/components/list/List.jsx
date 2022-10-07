import { Component } from "react";
import styles from "./List.module.css";
import * as getData from "../../apiCalls";
import Card from "../card/Card";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      showForm: false,
      newCard: "",
    };
  }

  componentDidMount() {
    getData
      .getCards(this.props.id)
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        this.setState({ cards: JSON.parse(text) });
      })
      .catch((err) => console.error(err));
  }

  addCardHandler = (e) => {
    e.preventDefault();
    if (!this.state.newCard) return;
    getData
      .createCard(this.props.id, this.state.newCard)
      .then((response) => {
        // console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        // console.log(JSON.parse(text));
        const newCards = [...this.state.cards];
        newCards.push(JSON.parse(text));
        this.setState({ cards: newCards });
      })
      .catch((err) => console.error(err));
    this.setState({ newCard: "" });
  };

  deleteCardHandler = (id) => {
    getData
      .deleteCard(id)
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => {
        console.log(text);
        const newCards = this.state.cards.filter((card) => id !== card.id);
        this.setState({ cards: newCards });
      })
      .catch((err) => console.error(err));
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    // console.log(this.props);
    return (
      <div className={styles.List}>
        <div className={styles.ListHeader}>
          <h2>{this.props.name}</h2>
          <DeleteIcon
            onClick={() => {
              this.props.handleDelete(this.props.id);
            }}
            className={styles.DeleteIcon}
          />
        </div>
        {this.state.cards.map((card, i) => (
          <Card key={i} {...card} handleCardDelete={this.deleteCardHandler} />
        ))}
        {this.state.showForm ? (
          <div className={styles.FormContainer}>
            <form className={styles.Form} onSubmit={this.addCardHandler}>
              <input
                type="text"
                value={this.state.newCard}
                placeholder="Enter Card Title"
                onChange={(e) => {
                  this.setState({ newCard: e.target.value });
                }}
              />
              <div className={styles.ButtonContainer}>
                <button>Add Card</button>
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
              <p>Add another Card</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
