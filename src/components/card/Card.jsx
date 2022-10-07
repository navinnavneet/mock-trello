import { Component } from "react";
import styles from "./Card.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CardDetails from "../cardDetails/CardDetails";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckList: false,
    };
  }
  toggleCheckListHandler = (e) => {
    this.setState({ showCheckList: !this.state.showCheckList });
  };

  render() {
    return (
      <div
        className={styles.Card}
        onClick={(e) => {
          e.stopPropagation();
          this.toggleCheckListHandler();
        }}
      >
        {this.state.showCheckList ? (
          <CardDetails
            {...this.props}
            hideCheckList={this.toggleCheckListHandler}
          />
        ) : null}
        <p>{this.props.name}</p>
        <DeleteIcon
          onClick={() => {
            this.props.handleCardDelete(this.props.id);
          }}
        />
      </div>
    );
  }
}
