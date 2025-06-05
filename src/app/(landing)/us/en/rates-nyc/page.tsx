import type { Metadata } from "next";
import React from "react";
import classNames from "classnames";
import {
  service_car_seats,
  service_pet_friendly,
  service_meet_and_great,
  service_free_cancellatoin,
  service_delivery,
  hourly_service_your_flexible_ride_solution,
} from "@/app/assets/images";
import styles from "./styles.module.scss";

const rates = [
  {
    title: "Car Seats",
    content:
      "Safe and reliable child car seat transportation, ensuring your little one's journey is secure and comfortable. Priced per seat, offering parents peace of mind with affordable and trustworthy service.",
    image: service_car_seats,
    services: [
      { label: "Infant/Toddler/Booster", value: "$12 per seat" },
      { label: "3 or more seats", value: "PLEASE CALL" },
    ],
  },
  {
    title: "Pet Friendly",
    content:
      "Most of our vehicles are pet-friendly! To ensure a smooth experience, please select the pet option in our app when requesting your ride. This helps us maintain the vehicle's interior.",
    image: service_pet_friendly,
    services: [
      { label: "Fee per each pet", value: "$12" },
      { label: "Service Animal", value: "RIDE FOR FREE" },
    ],
  },
  {
    title: "Meet and Great at Airport Service",
    content:
      "This meet and greet service is perfect for passengers who want their driver to meet them inside the terminal. The driver will hold a sign with the passenger's name and assist with any luggage.",
    image: service_meet_and_great,
    services: [
      { label: "Meet and Great Service", value: "$45 Includes 1 hour parking" },
    ],
  },
  {
    title: "Free Cancellations",
    content:
      "Experience peace of mind with our free cancellation policy, allowing you to cancel your reservation without charge up to one hour before your scheduled pickup time. Flexibility when you need it!",
    image: service_free_cancellatoin,
    subItem: {
      title: "No Shows",
      content:
        "A no-show charge of $10 will apply if you do not show up for your scheduled pickup. Thank you for your understanding.",
    },
  },
  {
    title: "Delivery Service",
    content:
      "Need a package to be delivered same day? Have one of our drivers drop it off in a safe and reliable manner.",
    image: service_delivery,
    services: [
      { label: "Delivery Fee (Curb-to-Curb)", value: "$10" },
      { label: "Loading and unloading service", value: "PLEASE CALL" },
    ],
  },
  {
    title: "Hourly Service",
    content: "A minimum of 2 hours must be booked to qualify for hourly rates.",
    image: hourly_service_your_flexible_ride_solution,
    subItem: {
      title: "Vehicle",
      items: [
        { label: "Sedan", value: "$40/hr" },
        { label: "Minivan", value: "$50/hr" },
        { label: "SUV", value: "$60/hr" },
        { label: "Ultimate SUV", value: "$70/hr" },
      ],
    },
  },
];

const Rates = () => {
  return (
    <section className={styles.rates}>
      <div className="container">
        <div className={styles.rates__inner}>
          <h2 className={styles.rates__title}>Our Rates</h2>
          <p className={styles.rates__description}>
            Experience affordable transportation in New York City, including
            vibrant neighborhoods in Brooklyn like Park Slope and Williamsburg,
            as well as Long Island and New Jersey. We offer fair pricing with no
            surge fees—ensuring reliable service whenever you need it.
          </p>

          <div className={styles.rates__list}>
            {rates.map((rate) => (
              <div key={rate.title} className={styles.rate}>
                <div className={styles.rate__img}>
                  <img src={rate.image.src} alt={rate.title} />
                </div>
                <div className={styles.rate__content}>
                  <h3 className={styles.rate__title}>{rate.title}</h3>
                  <p className={styles.rate__description}>{rate.content}</p>
                  {rate.services?.map((service) => (
                    <div key={service.label} className={styles.service}>
                      <p>{service.label}:</p>
                      <p className={styles.service__value}>{service.value}</p>
                    </div>
                  ))}
                  {rate.subItem && (
                    <>
                      <h4
                        className={classNames(
                          styles.rate__description,
                          styles.subitem__title
                        )}
                      >
                        {rate.subItem.title}
                      </h4>
                      {rate.subItem.content && (
                        <p className={styles.rate__description}>
                          {rate.subItem.content}
                        </p>
                      )}
                      {rate.subItem.items && (
                        <div className={styles.subitem__items}>
                          {rate.subItem.items.map((subItem) => (
                            <div key={subItem.label} className={styles.service}>
                              <p>{subItem.label}:</p>
                              <p className={styles.service__value}>
                                {subItem.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rates;

export const metadata: Metadata = {
  title: "Our Transportation Rates NYC | Westride",
  description:
    "Westride offers competitive airport rates, consisten pricing and flat rates from, to JFK, Newark and La Guardia airport all the year round.",
};
