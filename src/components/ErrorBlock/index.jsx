import React from "react";
import styles from "./ErrorBlock.module.scss";

const ErrorBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span> <br /> Error
        <p className={styles.desc}>Sorry, try the request later</p>
      </h1>
    </div>
  );
};

export default ErrorBlock;
