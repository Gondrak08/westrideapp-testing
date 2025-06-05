"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, InputForm, Logo } from "@/app/components";

import styles from "./styles.module.scss";

type FormValues = {
  login: string;
  password: string;
};

const Form = () => {
  const methods = useForm<FormValues>({
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);
  return (
    <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
      <Logo className={styles.form__logo} />
      <h2>Business Owner Login</h2>
      <InputForm
        className={styles.form__input}
        name="login"
        control={methods.control}
        placeholder="Email address/Phone number"
      />
      <InputForm
        className={styles.form__input}
        name="password"
        control={methods.control}
        placeholder="Password"
        type="password"
      />

      <Button className={styles.form__submit}>Enter</Button>
    </form>
  );
};

export default Form;
