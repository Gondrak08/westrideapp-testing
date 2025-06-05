"use client";
import React from "react";

import styles from "./styles.module.scss";
import Link from "next/link";
import classNames from "classnames";
const NavBar = ({ className }: { className?: string }) => {

  const language = 'en';
  const country = 'us';
    // const section = document.getElementById('reservation-section');
    // if (section) {
    //   section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
    // }
  
  return (
    <nav className={classNames(styles.nav, className)}>
      <Link href={"/#reservation-section"} className={classNames(styles.nav__item)}>
        Request
      </Link>
      <Link href={`/${country}/${language}/services-nyc`} className={classNames(styles.nav__item)}>
        Services
      </Link>
      <Link href={`/${country}/${language}/rates-nyc`} className={classNames(styles.nav__item)}>
        Rates
      </Link>
    </nav>
  );
};

export default NavBar;
