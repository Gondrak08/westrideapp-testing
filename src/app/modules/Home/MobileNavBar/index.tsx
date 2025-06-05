"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import styles from "./styles.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FacebookSvg, InstagramSvg, TwitterSvg } from "@/app/assets/svg";
const MobileNavBar = ({ className }: { className?: string }) => {
  const currentPath = usePathname();
  
  const language = 'en';
  const country = 'us';
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => {
    if (!show) {
      window.scrollTo(0, 0);
    }
    setShow((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "unset";
  }, [show]);

  useEffect(() => {
    setShow(false);
  }, [currentPath]);

  const handleRequestClick = () => {
    setShow(false);
    const section = document.getElementById("reservation-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <nav className={classNames(styles.nav, className)}>
      <button
        className={classNames(styles.nav__burger, show && styles.show)}
        onClick={toggleShow}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <Modal
        className={styles.menu}
        overlayClassName={styles.menu__overlay}
        isOpen={show}
        onRequestClose={() => {
          setShow(false);
        }}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <Link href="/#reservation-section" className={classNames(styles.menu__item)} onClick={handleRequestClick}>
          Request
        </Link>

        <Link href={`/${country}/${language}/services-nyc`} className={classNames(styles.menu__item)}>
          Services
        </Link>
        <Link href={`/${country}/${language}/rates-nyc`} className={classNames(styles.menu__item)}>
          Rates
        </Link>

        <div className={styles.menu__socials}>
          <a
            href="https://www.instagram.com/westrideapp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramSvg className={styles.rect}/>
          </a>
          <a
            href="https://x.com/westrideapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterSvg />
          </a>
          <a
            href="https://www.facebook.com/westrideapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookSvg />
          </a>
        </div>
      </Modal>
    </nav>
  );
};

export default MobileNavBar;
