import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Button from "../Button";

import { CheckoutFormProps } from "./form.types";
import { SyntheticEvent, useState } from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";
import Input from "../Input";

import { stripe as stripeImg } from "@/app/assets/images";

const validatePhone = (phone: string): boolean => {
  const phonePattern = /^\d{6,15}$/;
  const isValidPhone = phonePattern.test(phone);
  return isValidPhone;
};
const validateEmail = (email: string): boolean => {
  const phonePattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const isValidPhone = phonePattern.test(email);
  return isValidPhone;
};

const CheckoutForm = ({
  onSuccess,
  getProfile,
  setLoading = () => {},
  loading,
  onBack = () => {},
}: CheckoutFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);

    await getProfile({ name, email, phone });

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        payment_method_data: {
          billing_details: {
            address: {
              country: null,
            },
          },
        },
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      const id = result.paymentIntent.id;
      onSuccess(id);
    }
    setLoading(false);
  };

  elements?.update({
    appearance: {
      disableAnimations: true,

      variables: {
        borderRadius: "20px",
        fontSizeBase: "20px",
        // colorBackground: "#000",
        colorTextPlaceholder: "#bcbcbc",
        focusBoxShadow: "none",
        focusOutline: "none",
        gridRowSpacing: "0",
        spacingUnit: "6.3px",
      },
      rules: {
        ".Label": {
          fontSize: "0",
        },
        ".Input": {
          height: "60px",
          borderColor: "#000",
        },
      },
    },
  });

  const emailError = validateEmail(email);
  const phoneError = validatePhone(phone);

  console.log({ phone, phoneError, emailError });

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PaymentElement
        options={{
          fields: {
            billingDetails: {
              name: "auto",
              phone: "auto",
              email: "auto",
              address: {
                country: "never",
                postalCode: "auto",
              },
            },
          },
          wallets: {
            googlePay: "never",
            applePay: "never",
          },
        }}
      />
      <div className={styles.step__row}>
        <Input
          className={classNames(styles["step__inputs-item"])}
          placeholder="Name"
          value={name}
          onValueChange={setName}
          error={name && name.length < 5 ? "Invalid name" : ""}
        />
        <Input
          className={classNames(styles["step__inputs-item"])}
          placeholder="Phone Number"
          value={phone}
          onValueChange={setPhone}
          error={phone && !phoneError ? "Invalid mobile phone" : ""}
          type="number"
        />
      </div>
      <div className={styles.step__row}>
        <Input
          className={classNames(styles["step__inputs-item"])}
          placeholder="Email"
          value={email}
          onValueChange={setEmail}
          error={email && !emailError ? "Invalid email" : ""}
        />
        <div className={styles.step__stripe}>
          <img alt="stripe" src={stripeImg.src} />
        </div>
      </div>
      <div className={styles.step__actions}>
        <button type="button" className={classNames("showOn")} onClick={() => onBack()}>
          <div className={classNames(styles.step__backButton)}>
          ←
          </div>
        </button>
        <Button
          disabled={!stripe || !phoneError || name.length < 5 || !emailError}
          className={styles.form__btn}
          loading={loading}
          type="submit"
        >
          PRE-AUTHORIZE
        </Button>
      </div>
      <div className={styles.step__note}>
        <p>Your card will only be pre-authorized. The actual charge will occur after your trip is completed.</p>
      </div>
    </form>
  );
};

export default CheckoutForm;
