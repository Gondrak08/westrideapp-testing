import React from "react";

import styles from "./styles.module.scss";
import { downtown } from "@/app/assets/images";
const Airport = () => {
  return (
    <section className={styles.airport}>
      <div className="container">
        <div className={styles.airport__inner}>
          <div className={styles.airport__left}>
            <h2 className={styles.airport__title}>
              JFK, LaGuardia, Newark (EWR) Airport Flat Rates
            </h2>
            <p className={styles.airport__text}>
              Say goodbye to unpredictable fares with our affordable flat-rate airport transfers. 
              Whether you’re flying into JFK, Newark, or LaGuardia, enjoy a stress-free ride with no hidden fees. 
              Our transparent pricing ensures you know exactly what you’ll pay upfront, 
              offering both convenience and peace of mind for travelers in the Tri-State area.
            </p>
          </div>
          <div className={styles.airport__right}>
            <img src={downtown.src} alt="downtown" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Airport;
