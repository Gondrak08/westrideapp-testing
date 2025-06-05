"use client";

import React, { useEffect } from "react";
import { Book } from "../modules/Home";
import { axiosInstance } from "../utils";
import { CookiesProvider } from "react-cookie";
const Home = () => {
  const getSessionId = async () => {
    try {
      await axiosInstance.get(`booking2.php`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSessionId();
  }, []);
  return (
    <CookiesProvider>
      <Book />
    </CookiesProvider>
  );
};

export default Home;
