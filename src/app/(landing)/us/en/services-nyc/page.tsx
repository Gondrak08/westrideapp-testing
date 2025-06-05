import React from "react";
import type { Metadata } from "next";
import styles from "./styles.module.scss";
import {
  service_car_seats, 
  service_pet_friendly, 
  service_meet_and_great, 
  service_chat_and_phone_support, 
  service_free_cancellatoin,
  earn_reward_points_with_every_ride,
  hourly_service_your_flexible_ride_solution,
  passenger_oriented_service,
  service_consistent_price_no_surge_fares
} from "@/app/assets/images";

const services = [
  {
    title: "Car Seats",
    content:
      "A professional service that provides secure, comfortable, and safe car seat installation for your child. We ensure that your car seat is properly fitted and meets safety standards, giving you peace of mind during every journey.",
    image: service_car_seats,
  },
  {
    title: "Pet Friendly",
    content:
      "A convenient and comfortable transportation service designed with your pet in mind. Our vehicles are equipped with pet-friendly amenities, including secure pet seats, plenty of space, and clean.",
    image: service_pet_friendly,
  },
  {
    title: "Meet & Greet at Airport Service",
    content:
      "Step off the plane and straight into VIP treatment! Our stylish and attentive greeters will meet you at the gate or arrival area, whisking you past the lines and handling your luggage with ease. We’ll make sure your airport experience is as smooth and luxurious as possible. Relax, you’ve arrived in style!",
    image: service_meet_and_great,
  },
  {
    title: "Outstanding Customer Service, Anytime",
    content:
      "Experience top-tier support with our dedicated team, available via chat or phone. Whether you have a quick question or need assistance on the go, we're here to provide prompt, friendly, and knowledgeable service—every step of the way. Your satisfaction is our priority, 24/7 all year round.",
    image: service_chat_and_phone_support,
  },
  {
    title: "Consistent Pricing, No Surge Fares",
    content:
      "Enjoy hassle-free travel with our guaranteed consistent rates—no surge pricing, ever. Whether it’s rush hour or a busy holiday, you’ll always pay the same affordable price. Reliable, transparent, and stress-free—because you deserve a predictable ride, not unexpected costs.",
    image: service_consistent_price_no_surge_fares,
  },
  {
    title: "Free Cancellation",
    content:
      "Plans change, and we understand. That's why we offer free cancellation—no fees, no stress. Book with confidence, knowing you can adjust or cancel anytime without worry. Your flexibility is our priority!",
    image: service_free_cancellatoin,
  },
  {
    title:"Earn Reward Points with Every Ride",
    content:"Get more from every trip! Our rewards program lets you accumulate points with each ride, which can be redeemed for discounts, free upgrades, and exclusive perks. The more you travel, the more you save!",
    image:earn_reward_points_with_every_ride
  },
  {
    title:"Passenger-Oriented Service",
    content:"Your comfort and convenience are our top priorities. We tailor every detail of our service to meet your needs, ensuring a smooth, personalized experience from start to finish. Because with us, it’s all about you.",
    image:passenger_oriented_service
  },
  {
    title:"Hourly Service-Your Flexible Ride Solution",
    content:"Need a car for a few hours? Our hourly car service offers the ultimate flexibility, allowing you to enjoy a premium vehicle and driver on your schedule. Perfect for meetings, events, or spontaneous plans—pay only for the time you need!",
    image:hourly_service_your_flexible_ride_solution
  }
];

const Services = () => {
  return (
    <section className={styles.services}>
      <div className="container">
        <div className={styles.services__inner}>
          <h2 className={styles.services__title}>Our Services</h2>

          <div className={styles.services__list}>
            {services.map((service, index) => (
              <div
                className={`${styles.service} ${
                  index % 2 === 0 ? styles.service__normal : styles.service__reverse
                }`}
                key={service.title}
              >
                <div className={styles.service__content}>
                  <h3 className={styles.service__title}>{service.title}</h3>
                  <p className={styles.service__description}>{service.content}</p>
                </div>
                <div className={styles.service__img}>
                  <img src={service.image.src} alt={service.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

export const metadata: Metadata = {
  title: "Our  Transportation Services  NYC | Westride",
  description: "Enjoy reliable transportation with consistent pricing, friendly dispatchers, and respectful drivers. Westride guarantees a smooth ride every time.",
};