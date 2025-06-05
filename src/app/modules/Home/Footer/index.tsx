import React from "react";

import styles from "./styles.module.scss";
import { FacebookSvg, InstagramSvg, TwitterSvg } from "@/app/assets/svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__inner}>
          <div className={styles.footer__box}>
            <div className={styles["footer__box-left"]}>
              <p className={styles["service-areas"]}>
                Our Service Areas
              </p>
              <p className={styles["location"]}>
                New York City
              </p>
              <p className={styles["location"]}>
                North Jersey
              </p>
              <p className={styles["location"]}>Miami</p>
            </div>
            <div className={styles["footer__box-right"]}>
              <p>Follow Us!</p>
              <div className={styles.footer__socials}>
                <a
                    href="https://www.instagram.com/westrideapp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <InstagramSvg />
                  </a>
                  <a
                  href="https://x.com/westrideapp"
                  target="_blank"
                  rel="noopener noreferrer"
                    aria-label="Twitter"
                >
                  <TwitterSvg />
                </a>
                <a
                  href="https://www.facebook.com/westrideapp"
                  target="_blank"
                  rel="noopener noreferrer"
                    aria-label="Facebook"
                >
                  <FacebookSvg />
                </a>
              </div>
              <div className={styles.footer__links}>
                <a href="#">Terms of service</a>
                <a href="#">Privacy</a>
              </div>
            </div>
          </div>
          <div className={styles.footer__rights}>
            © 2024 - Westride LLC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
