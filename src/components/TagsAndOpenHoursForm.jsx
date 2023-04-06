import React, {useEffect, useState} from "react";
import {Formik, Form, Field, FieldArray, ErrorMessage} from "formik";
import axios from "axios";

const TagsAndOpenHoursForm = ({data, setData, step, setStep}) => {
  const days = [
    {key: "mon", value: "Monday"},
    {key: "tue", value: "Tuesday"},
    {key: "wed", value: "Wednesday"},
    {key: "thu", value: "Thursday"},
    {key: "fri", value: "Friday"},
    {key: "sat", value: "Saturday"},
    {key: "sun", value: "Sunday"},
  ];
  const [services, setServices] = useState([]);
  const [animals, setAnimals] = useState([]);
  const fetchContent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/products/tags`);
      await setServices([
        ...res.data.serviceTags["clinic"],
        ...res.data.serviceTags["service"],
        ...res.data.serviceTags["petfriendly"],
      ]);
      setAnimals(res.data.petTags);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchContent();
  }, []);
  return (
    <div className="tags-and-open-hours-form">
      <Formik
        initialValues={data}
        validate={(values) => {
          const errors = {};
          let pricesError = [];
          for (let i = 0; i < values.prices.length; i += 1) {
            if (
              !values.prices[i].service ||
              !values.prices[i].price ||
              values.prices[i].price < 0
            ) {
              pricesError.push(i + 1);
            }
          }
          if (pricesError.length > 0) {
            const errorAt = pricesError.toString(", ");
            errors.prices = `Please enter the correct service No. ${errorAt}`;
          }
          let hasOpenHours = false;
          for (const day of days) {
            let periodError = [];
            let OpenBeforePreviousClose = [];
            for (let i = 0; i < values[day.key].length; i += 1) {
              hasOpenHours = true;
              if (
                typeof values[day.key][i] == "string" ||
                !values[day.key][i].hasOwnProperty("openAt") ||
                !values[day.key][i].hasOwnProperty("closeAt") ||
                values[day.key][i].closeAt == "" ||
                values[day.key][i].openAt == ""
              ) {
                periodError.push(i + 1);
                continue;
              }
              const open = values[day.key][i].openAt.split(":");
              const openAt = parseInt(open[0]) * 60 + parseInt(open[1]);
              const close = values[day.key][i].closeAt.split(":");
              const closeAt = parseInt(close[0]) * 60 + parseInt(close[1]);
              if (closeAt < openAt) {
                periodError.push(i + 1);
                continue;
              }
              if (i == 0) continue;
              const previousClose = values[day.key][i - 1].closeAt.split(":");
              const previousCloseAt =
                parseInt(previousClose[0]) * 60 + parseInt(previousClose[1]);
              if (previousCloseAt > openAt) {
                OpenBeforePreviousClose.push(i + 1);
              }
            }
            if (periodError.length > 0) {
              const errorAt = periodError.toString(", ");
              errors[
                day.key
              ] = `Please enter the correct period No. ${errorAt}`;
              if (OpenBeforePreviousClose > 0) errors[day.key] += "\n";
            }
            if (OpenBeforePreviousClose > 0) {
              const errorAt = OpenBeforePreviousClose.toString(", ");
              errors[
                day.key
              ] = `Open time of period No. ${errorAt} must be after the previous close time`;
            }
          }
          if (!hasOpenHours) {
            errors["sun"] = "Please add at least 1 opening hour.";
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
            <Form className="form">
              <h4>Types of Accepted Pets</h4>
              {animals.map((value, index) => (
                <label>
                  <Field
                    type="checkbox"
                    className="checkbox"
                    name="petTags"
                    value={value}
                  />
                  {value}
                </label>
              ))}

              <h4>Types of Services</h4>
              {services.map((value, index) => (
                <label>
                  <Field
                    type="checkbox"
                    className="checkbox"
                    name="serviceTags"
                    value={value}
                  />
                  {value}
                </label>
              ))}
              <h4>
                Opening Hours<span className="required"> *</span>
              </h4>
              {days.map((day, index) => (
                <>
                  <label>{day.value}</label>
                  <FieldArray
                    name={`${day.key}`}
                    render={(arrayHelpers) => (
                      <div className="array">
                        {values[day.key] ? (
                          <div>
                            {values[day.key].map((period, index2) => (
                              <div key={index2} className="period">
                                <label className="index">{`${
                                  index2 + 1
                                }: `}</label>
                                <label>Open</label>
                                <Field
                                  type="time"
                                  name={`${day.key}[${index2}].openAt`}
                                />
                                <label>Close</label>
                                <Field
                                  type="time"
                                  name={`${day.key}[${index2}].closeAt`}
                                />
                                {index2 >= 0 && (
                                  <button
                                    type="button"
                                    className="btn delete-btn"
                                    onClick={() => arrayHelpers.remove(index2)}
                                  >
                                    delete
                                  </button>
                                )}
                              </div>
                            ))}

                            <button
                              type="button"
                              className="btn add-btn"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add an opening hour
                            </button>

                            <ErrorMessage
                              className="error"
                              name={`${day.key}`}
                              component="div"
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  />
                </>
              ))}

              <h4>Prices</h4>
              <FieldArray
                name="prices"
                render={(arrayHelpers) => (
                  <div>
                    {values.prices ? (
                      <div className="array">
                        {values.prices.map((prices, index) => (
                          <div key={index} className="period">
                            <label className="index">{`${index + 1}: `}</label>
                            <label>Service</label>
                            <Field name={`prices[${index}].service`} />
                            <label>Price</label>
                            <Field
                              type="number"
                              className="price"
                              name={`prices[${index}].price`}
                            />
                            {index >= 0 && (
                              <button
                                type="button"
                                className="btn delete-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                delete
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          className="btn add-btn"
                          onClick={() => arrayHelpers.push("")}
                        >
                          Add a serivice
                        </button>

                        <ErrorMessage
                          className="error"
                          name="prices"
                          component="div"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
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

export default TagsAndOpenHoursForm;
