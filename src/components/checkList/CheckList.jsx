import { Component } from "react";
import styles from "./CheckList.module.css";

export default class CheckList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div onClick={this.props.hideCheckList} className={styles.Modal}>
        <div className={styles.CheckList}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
