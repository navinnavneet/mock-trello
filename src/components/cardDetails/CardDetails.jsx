import React, { Component } from "react";
import styles from "./CardDetails.module.css";

export default class CheckList extends Component {
  constructor(props) {
    super(props);
    this.refCheckList = React.createRef();
  }
  render() {
    console.log(this.props);
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          if (e.target.isEqualNode(this.refCheckList.current)) return;
          this.props.hideCheckList();
        }}
        className={styles.Modal}
      >
        <div ref={this.refCheckList} className={styles.CheckList}>
          <h2>{this.props.name}</h2>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
