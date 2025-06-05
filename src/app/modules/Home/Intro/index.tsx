"use client";
import React from "react";

import styles from "./styles.module.scss";
const Intro = () => {
  return (
    <section className={styles.intro}>
      <div className={styles.intro__bg} >
        <div className="container">
          <h1>
            Check the rates and request a ride with <b>WestRide</b>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Intro;
