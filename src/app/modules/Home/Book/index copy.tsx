"use client";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Map, Step1, Step2, Step3 } from "./components";
import { MapProvider } from "@/app/providers/map-provider";
import { CarQuote, CarType } from "@/app/interfaces/car";
import { axiosInstance } from "@/app/utils";
import { getBookingRequestBody } from "@/app/utils/book";
import { SelectItem } from "@/app/components/Select/select.types";
// import { carseatList, meetList, passList, petList } from "@/app/constants/cars";
import { minutes } from "@/app/constants/time";
import { toast } from "react-toastify";
import moment from "moment";

type DayTime = "AM" | "PM" | undefined

export interface Form {
  from?: Partial<google.maps.places.AutocompletePrediction>;
  to?: Partial<google.maps.places.AutocompletePrediction>;
  date?: Date | null;
  hour?: string | number;
  minute?: string | number;
  dayTime?: DayTime;
  pass_number?: SelectItem;
  pet?: SelectItem;
  carseat?: SelectItem;
  meet?: SelectItem;
  cars?: {
    [key in CarType]: CarQuote;
  };
  car?: CarType;
  isNow?: boolean;
  paymentId?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const steps = [
  {
    component: Step1,
  },
  {
    component: Step2,
  },
  {
    component: Step3,
  },
];

const reservationDate = moment().add(2, 'h')

const initValues = {
  pass_number: { label: "" },
  pet: { label: "" },
  carseat: { label: "" },
  meet: { label: "" },
   from: {
     description: "1 Elizabeth Street, New York, NY, USA",
     place_id: "ChIJmX62ACdawokR02NfgvQNL10",
   },
   to: {
     description: "150 Elizabeth Street, New York, NY, USA",
     place_id: "ChIJY5PfgohZwokRVh_MGOK-Oqo",
   },
  date: reservationDate.toDate(),
  hour: reservationDate.format('hh'),
  minute: minutes[0],
  dayTime: reservationDate.format('A') as DayTime,
};
const Book = () => {
  const [step, setStep] = useState<number>(0);
  const [form, setForm] = useState<Form>(initValues);
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const activeStep = steps[step];

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0)); // Move back one step, but don't go below 0
  };

  const updateForm = (data: Partial<Form>) => {
    setForm((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const validateBooking = async (
    cartype: CarType,
    values?: Partial<Form>
  ): Promise<CarQuote | undefined> => {
    try {

      const resp = await axiosInstance.post(`includes/ajax/_booking2.php`, {
        method: "validate_booking",
        params: getBookingRequestBody({ ...form, ...values }, cartype),
      });
      if (resp.data?.success) {
        const quoteResp = await axiosInstance.post(
          `includes/ajax/_booking_quote2.php`,
          { method: "get_quote" }
        );
        const quote = quoteResp.data?.results?.quote;
        const car = {
          price: quote?.pricing?.subtotal,
          travel_time: quote?.travel_time?.label,
        };
        console.log({ car });

        return car;
      }
      console.log(resp);
    } catch (e) {
      console.log(e);
    }
  };

  const validateBookings = async () => {
    setLoading(true);
    const eco_sd = await validateBooking("eco_sd");
    const eco_mv = await validateBooking("eco_mv");
    const eco_suv = await validateBooking("eco_suv");
    updateForm({
      cars: {
        eco_sd: eco_sd as CarQuote,
        eco_mv: eco_mv as CarQuote,
        eco_suv: eco_suv as CarQuote,
      },
    });
    setLoading(false);
  };

  const getQuote = async () => {
    try {
      const resp = await axiosInstance.post(
        `includes/ajax/_booking_quote2.php`,
        {
          method: "show_quote",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setQuote(resp.data);
      console.log(resp);
    } catch (e) {
      console.log(`[getQuote] err:`, e);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (): Promise<boolean> => {    
    try {
      setLoading(true);     

      const params = new URLSearchParams();
      params.append('email', 'webcustomer@internal');
      params.append('password', 'P$Dinternal');
    
      const resp = await axiosInstance.post(
        `https://westrideapp.com:88/login`,
        params
      );    
            
      console.log("logged in", resp);
      setLoading(false);
      return true;
    } catch (e) {
      toast.error("Something went wrong (l)");
      setLoading(false);
      console.log(`[getQuote] err:`, e);
      return false;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createOrder = async (paymentId: string) => {
    try {
      /*const isLoggedIn = await login();  
      if (!isLoggedIn) {
        return; 
      }*/

      setLoading(true);   
      
      const params = new URLSearchParams();
      params.append('jdate', '01/11/2025');
      params.append('jtime', '06:42:16 PM');
      params.append('jline', '00');
      params.append('jtelephone', '111-111-1111');
      params.append('jper', '0');
      params.append('jdate_reser', '01/11/2025');
      params.append('jdate_reser_aux', '2025-01-11 06:00:00');
      params.append('jhour_reser', '06');
      params.append('jmin_reser', '00');
      params.append('jampm_reser', 'AM');
      params.append('jpopup_reser', '0');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //params.append('jpickup', form.dest_address);
      params.append('jcity_pickup', '0');
      params.append('jstate_pickup', '0');

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //params.append('jdropoff', form.pu_address);
      params.append('jcity_dropoff', '0');
      params.append('jstate_dropoff', '0');
      params.append('jtype_car', '2');
      params.append('jpass', '1');
      params.append('jpets', '2');
      params.append('jcseats', '3');
      params.append('jstop', '4');
      params.append('jfare', '5');
      params.append('jjob_status', '1');
      params.append('jjob_status_aux', '0');
      params.append('jobservations', '0');
      params.append('joperator', '0');
      params.append('jdispatcher', '0');
      params.append('jdate_dt', '0');
      params.append('jdate_dt_aux', '0');
      params.append('jhour_dt', '01');
      params.append('jmin_dt', '00');
      params.append('jsec_dt', '00');
      params.append('jampm_dt', 'AM');
      params.append('jcar', '0');
      params.append('jcar_id', '0');
      params.append('jcar_type', '0');
      params.append('jcar_service', '0');
      params.append('jeta', '0');
      params.append('jmotive', '0');
      params.append('jacc', '0');
      params.append('jacc_name', '0');
      params.append('jpassname', 'test');
      params.append('jflight', '0');
      params.append('jluggage', '0');
      params.append('jnamecard', '0');
      params.append('jccnumber', '0');
      params.append('jexpdate', '0');
      params.append('jexpdate_aux', '0');
      params.append('jccv', '0');
      params.append('jzip', '0');
      params.append('number_tmp', '0');
      params.append('jid_job', '0');
      params.append('jid_credit_card', '0');
      params.append('jcall_time', '2025-01-11 18:42:16');
      params.append('jclient', '0');
      params.append('jper_id', '0');
      params.append('jrvt', 'on');      

      /*const resp = await axiosInstance.post("http://westrideapp.com:88/job_save", {
        method: "book",
        paymentId,
      });*/

      
      console.log('form', form);      

      toast.success("Sending booking to dispatcher.... Created.");
      setForm(initValues);
      setStep(0);
      setQuote("");      
      setLoading(false);
    } catch (e) {
      toast.error("Something went wrong");
      setLoading(false);
      console.log(`[getQuote] err:`, e);
    }
  };

  const nextStep = async (paymentId?: string) => {
    if (step === 0) {
      await validateBookings();
    }
    if (step === 1) {
      await validateBooking(form.car as CarType);
      await getQuote();
    }
    if (step === 2) {
      await createOrder(paymentId ?? "");
      return;
    }
    setStep((prev) => {
      const newStep = prev + 1;
      if (!steps[newStep]) {
        return prev;
      }
      return newStep;
    });
  };

  const getProfile = async (values: Partial<Form>) => {
    try {
      await axiosInstance.post(`includes/ajax/_booking2.php`);
      await validateBooking(form.car as CarType, values);
    } catch (e) {
      console.log(`[getProfile] err:`, e);
    }
  };

  useEffect(() => {
    if (step === 1) {
      validateBookings();
    }
  }, [form.pass_number, form.pet, form.carseat, form.meet]);

  return (
    <div id="reservation-section" className={styles.book}>
      <div className="container">
          <div className={styles.book__inner}>
            <div className={styles.book__map}>
              <MapProvider>
                <Map form={form} />
              </MapProvider>
            </div>
            <div className={styles.book__content}>
              <activeStep.component
                onSubmit={nextStep}
                onBack={prevStep}
                form={form}
                updateForm={updateForm}
                loading={loading}
                getProfile={getProfile}
                setLoading={setLoading}
              />
            </div>
          </div>
        <div
          className={styles.hidden}
          dangerouslySetInnerHTML={{ __html: quote }}
        />
      </div>
    </div>
  );
};

export default Book;
