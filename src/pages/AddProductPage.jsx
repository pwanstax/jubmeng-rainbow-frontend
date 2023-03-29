import React, {useState, useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";
import BasicInfoForm from "../components/BasicInfoForm";
import LocationForm from "../components/LocationForm";
import TagsAndOpenHoursForm from "../components/TagsAndOpenHoursForm";
import ImagesForm from "../components/ImagesForm";
const AddProductPage = () => {
  const step1 = {
    type: "",
    name: "",
    phones: [],
    facebook: "",
    instagram: "",
    lineID: "",
    twitter: "",
    description: "",
    licenseID: "",
  };
  const step2 = {
    province: "",
    amphure: "",
    tambon: "",
    locationDescription: "",
    latitude: "",
    longitude: "",
  };
  const step3 = {
    petTags: [],
    serviceTags: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
    prices: [],
  };

  const [dataStep1, setDataStep1] = useState(step1);
  const [dataStep2, setDataStep2] = useState(step2);
  const [dataStep3, setDataStep3] = useState(step3);
  const [dataStep4, setDataStep4] = useState();
  const [step, setStep] = useState(1);

  const createSubmitFormData = () => {
    const formData = new FormData();
    formData.append("owner_user_id", sessionStorage.getItem("user_id"));
    formData.append("owner", sessionStorage.getItem("username"));

    for (const [key, value] of Object.entries(dataStep1)) {
      if (key == "type" || !value) {
        continue;
      } else if (key == "phones") {
        for (const e of value) {
          formData.append(key, e);
        }
      } else {
        formData.append(key, value);
      }
    }
    for (const [key, value] of Object.entries(dataStep2)) {
      formData.append(key, value);
    }

    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    const openHours = [];
    for (const [key, value] of Object.entries(dataStep3)) {
      if (days.includes(key)) {
        if (value.length > 0) {
          openHours.push(
            JSON.stringify({
              day: key,
              periods: value,
            })
          );
        }
      } else if (key == "prices") {
        for (const e of value) {
          formData.append(key, JSON.stringify(e));
        }
      } else {
        for (const e of value) {
          formData.append(key, e);
        }
      }
    }
    for (const e of openHours) {
      formData.append("openHours[]", e);
    }

    for (let i = 0; i < dataStep4.length; i++) {
      formData.append("images", dataStep4[i]);
    }

    return formData;
  };
  useEffect(() => {
    const sendData = async (formData) => {
      try {
        await axios.post(
          `http://localhost:8080/product/${dataStep1.type}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        window.location.assign("/");
      } catch (error) {
        console.log("error", error);
      }
    };
    if (step === 5) {
      //submit
      const formData = createSubmitFormData();
      sendData(formData);
    } else if (step >= 2) {
      window.scrollTo(0, 0);
    }
  }, [step]);
  return (
    <div className="add-product-page">
      <div className="wrap-all">
        <h2 className="title">Add Your Merchant</h2>
        {step === 1 && (
          <BasicInfoForm
            data={dataStep1}
            setData={setDataStep1}
            step={step}
            setStep={setStep}
          />
        )}
        {step === 2 && (
          <div>
            <LocationForm
              data={dataStep2}
              setData={setDataStep2}
              step={step}
              setStep={setStep}
            />
          </div>
        )}
        {step === 3 && (
          <TagsAndOpenHoursForm
            data={dataStep3}
            setData={setDataStep3}
            type={dataStep1.type}
            step={step}
            setStep={setStep}
          />
        )}
        {(step === 4 || step === 5) && (
          <ImagesForm setData={setDataStep4} step={step} setStep={setStep} />
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
