import { Component } from "react";
import styles from "./Header.module.css";
import AlignVerticalTopIcon from "@mui/icons-material/AlignVerticalTop";
import SearchIcon from "@mui/icons-material/Search";

export default class Header extends Component {
  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.HeaderLeft}>
          <div className={styles.Logo}>
            <AlignVerticalTopIcon />
            <h1>NuTrello</h1>
          </div>
          <ul className={styles.Navbar}>
            <li>Workplaces</li>
            <li>Recent</li>
            <li>Starred</li>
            <li>Template</li>
          </ul>
        </div>
        <div className={styles.HeaderRight}>
          <div className={styles.Input}>
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>
          <div className={styles.User}>
            <p>NN</p>
          </div>
        </div>
      </header>
    );
  }
}
