import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import {
  service_car_seats,
  service_pet_friendly,
  service_meet_and_great,
  service_chat_and_phone_support,
  service_consistent_price_no_surge_fares,
  service_free_cancellatoin,
} from "@/app/assets/images";

const services = [
  {
    title: "Car Seats",
    image: service_car_seats,
  },

  {
    title: "Pet Friendly",
    image: service_pet_friendly,
  },
  {
    title: "Meet & Greet at Airport Service",
    image: service_meet_and_great,
  },
  {
    title: "Outstanding Customer Service, Anytime",
    image: service_chat_and_phone_support,
  },
  {
    title: "Consistent Pricing, No Surge Fares",
    image: service_consistent_price_no_surge_fares,
  },
  {
    title: "Free Cancellation",
    image: service_free_cancellatoin,
  },
];
const Services = () => {
  const language = 'en';
  const country = 'us';

  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.services__inner}>
          <h2>Our Services</h2>

          <div className={styles.services__list}>
            {services.map((el) => (
              <div className={styles.service} key={el.title}>
                <div className={styles.service__img}>
                  {el.image ? <img src={el.image.src} alt={el.title} /> : null}
                </div>
                <div className={styles.service__title}>{el.title}</div>
              </div>
            ))}
          </div>
          <div className={styles.services__button}>
            <Link
              href={`/${country}/${language}/services-nyc`}
              className={styles.learnMoreButton}
            >
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
