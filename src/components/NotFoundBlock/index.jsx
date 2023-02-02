import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span> <br /> Page not found
        <p className={styles.desc}>
          Sorry, this page is not available in our online store.
        </p>
      </h1>
    </div>
  );
};
