import { Component } from "react";
import styles from "./Card.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckList from "../checkList/CheckList";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckList: false,
    };
  }
  showCheckListHandler = () => {
    this.setState({ showCheckList: true });
  };
  hideCheckListHandler = () => {
    console.log("close Modal");
    this.setState({ showCheckList: false });
  };
  render() {
    return (
      <div className={styles.Card} onClick={this.showCheckListHandler}>
        {this.state.showCheckList && (
          <CheckList hideCheckList={this.hideCheckListHandler} />
        )}
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
