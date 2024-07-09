import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["notfound-container"]}>
      <div className={styles.notfound}>
        <div class={styles["notfound-404"]}>
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <Link to="/">Go TO Homepage</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
