import { Component } from "react";
import styles from "./CheckList.module.css";

export default class CheckList extends Component {
  render() {
    // console.log(this.props);
    return (
      <fieldset className={styles.CheckList}>
        <legend>{this.props.name}</legend>
        <div>
          <input type="checkbox" name="scales" />
          <label htmlFor="">Scales</label>
        </div>
      </fieldset>
    );
  }
}
