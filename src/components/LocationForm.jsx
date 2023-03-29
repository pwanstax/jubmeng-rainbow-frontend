import React, {useState, useEffect} from "react";
import axios from "axios";
import {Formik, Form, Field, ErrorMessage} from "formik";
const LocationForm = ({step, setStep, data, setData}) => {
  const [provinces, setProvinces] = useState([]);
  const [nowProvince, setNowProvince] = useState("");
  const [amphures, setAmphures] = useState([]);
  const [tambons, setTambons] = useState([]);

  const getProvinces = async () => {
    const res = await axios.get(`https://ckartisan.com/api/provinces`);
    setProvinces(res.data);
  };
  const getAmphures = async (province) => {
    const res = await axios.get(
      `https://ckartisan.com/api/amphoes?province=${province}`
    );
    setAmphures(res.data);
  };
  const getTambons = async (province, amphure) => {
    const res = await axios.get(
      `https://ckartisan.com/api/tambons?province=${province}&amphoe=${amphure}`
    );
    setTambons(res.data);
  };
  const handleProvinceChange = async (value) => {
    setNowProvince(value);
    try {
      getAmphures(value);
      //getTambons(value, "");
    } catch (error) {
      console.error(error);
    }
  };
  const handleAmphureChange = async (value) => {
    try {
      getTambons(nowProvince, value);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = async (e) => {
    const {name, value} = e.target;
    if (name == "province") {
      handleProvinceChange(value);
    } else if (name == "amphure") {
      handleAmphureChange(value);
    }
  };
  useEffect(() => {
    const fetchContent = async () => {
      try {
        getProvinces();
        // getAmphures("กระบี่");
        // getTambons("กระบี่", "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
    return () => {};
  }, []);
  return (
    <div className="location-form">
      <Formik
        initialValues={data}
        validate={async (values) => {
          const errors = {};
          if (!values.province) {
            errors.province = "Please select your merchant's province.";
          }
          if (!values.amphure) {
            errors.amphure = "Please select your merchant's amphure.";
          }
          if (!values.tambon) {
            errors.tambon = "Please select your merchant's tambon.";
          }
          if (!values.locationDescription.trim()) {
            errors.locationDescription =
              "Please enter your merchant's full address.";
          }

          if (!values.latitude) {
            errors.latitude = "Please enter your merchant's latitude.";
          } else if (values.latitude < -90 || values.latitude > 90) {
            errors.latitude = "Please enter the correct latitude.";
          }

          if (!values.longitude) {
            errors.longitude = "Please enter your merchant's longitude.";
          } else if (values.longitude < -180 || values.longitude > 180) {
            errors.longitude = "Please enter the correct longitude.";
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          setData(values);
          setSubmitting(false);
          setStep(step + 1);
        }}
        render={({values, isSubmitting}) => (
          <div>
            <Form className="form" onChange={handleChange}>
              <h4 className="h4">
                Province<span className="required"> *</span>
              </h4>
              <Field as="select" name="province">
                <option disabled hidden></option>
                {provinces.map((option) => (
                  <option value={option.province} key={option.province}>
                    {option.province}
                  </option>
                ))}
              </Field>
              <ErrorMessage className="error" name="province" component="div" />

              <h4 className="h4">
                Amphure<span className="required"> *</span>
              </h4>
              <Field as="select" name="amphure">
                <option disabled hidden></option>
                {amphures.map((option) => (
                  <option value={option.amphoe} key={option.amphoe}>
                    {option.amphoe}
                  </option>
                ))}
              </Field>
              <ErrorMessage className="error" name="amphure" component="div" />

              <h4 className="h4">
                Tambon<span className="required"> *</span>
              </h4>
              <Field as="select" name="tambon">
                <option disabled hidden></option>
                {tambons.map((option) => (
                  <option value={option.tambon} key={option.tambon}>
                    {option.tambon}
                  </option>
                ))}
              </Field>
              <ErrorMessage className="error" name="tambon" component="div" />

              <h4 className="h4">
                Full Address<span className="required"> *</span>
              </h4>
              <Field
                name="locationDescription"
                render={({field}) => (
                  <textarea
                    {...field}
                    placeholder="254 ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330"
                  ></textarea>
                )}
              />
              <ErrorMessage
                className="error"
                name="locationDescription"
                component="div"
              />
              <hr className="line-between-location"></hr>
              <a
                href="https://www.wikihow.com/Get-Latitude-and-Longitude-from-Google-Maps"
                target="_blank"
                className="how-to-get"
              >
                How to get latitude and longitude from Google Maps
              </a>
              <h4 className="h4">
                Latitude<span className="required"> *</span>
              </h4>
              <Field type="number" name="latitude" />
              <ErrorMessage className="error" name="latitude" component="div" />
              <h4 className="h4">
                Longitude<span className="required"> *</span>
              </h4>
              <Field type="number" name="longitude" />
              <ErrorMessage
                className="error"
                name="longitude"
                component="div"
              />
              <button
                type="submit"
                className="btn submit-btn"
                disabled={isSubmitting}
              >
                Next
              </button>
            </Form>
          </div>
        )}
      />
    </div>
  );
};

export default LocationForm;
