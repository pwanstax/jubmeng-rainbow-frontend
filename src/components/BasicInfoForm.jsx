import React from "react";
import {Formik, Form, Field, FieldArray, ErrorMessage} from "formik";
const BasicInfoForm = ({step, setStep, data, setData}) => {
  return (
    <div className="basic-info-form">
      <Formik
        initialValues={data}
        validate={(values) => {
          const errors = {};
          if (!values.name.trim()) {
            errors.name = "Please enter your merchant's name.";
          }
          if (!values.licenseID.trim()) {
            errors.licenseID = "Please enter your merchant's license ID.";
          }
          let phonesError = [];
          for (let i = 0; i < values.phones.length; i += 1) {
            if (values.phones[i].length > 0) {
              const last = values.phones[i].charAt(values.phones[i].length - 1);
              if (
                !last.match(/^(\d)$/) ||
                (values.phones[i].length === 1 && last !== "0")
              ) {
                values.phones[i] = values.phones[i].slice(
                  0,
                  values.phones[i].length - 1
                );
              }
            }

            if (values.phones[i].length < 9 || values.phones[i].length > 10) {
              phonesError.push(i + 1);
            }
          }
          if (phonesError.length > 0) {
            const errorAt = phonesError.toString(", ");
            errors.phones = `Please enter the correct phone number ${errorAt}`;
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
              <h4 className="h4">
                Merchant Name<span className="required"> *</span>
              </h4>
              <Field type="text" name="name" />
              <ErrorMessage className="error" name="name" component="div" />

              <h4 className="h4">
                License ID<span className="required"> *</span>
              </h4>
              <Field type="text" name="licenseID" />
              <ErrorMessage
                className="error"
                name="licenseID"
                component="div"
              />

              <h4 className="h4">Phones</h4>
              <FieldArray
                name="phones"
                render={(arrayHelpers) => (
                  <div>
                    {values.phones ? (
                      <div className="phones">
                        {values.phones.map((phone, index) => (
                          <div key={index}>
                            <label className="index">{`${index + 1}: `}</label>
                            <Field
                              name={`phones[${index}]`}
                              className="phone"
                              placeholder="0812345678"
                            />
                            {index >= 0 && (
                              <button
                                type="button"
                                className="delete-btn btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                delete
                              </button>
                            )}
                          </div>
                        ))}
                        {values.phones.length < 4 && (
                          <button
                            type="button"
                            className="btn add-btn"
                            onClick={() => arrayHelpers.push("")}
                          >
                            {/* show this when user has removed all phones from the list */}
                            Add a phone number
                          </button>
                        )}
                        <ErrorMessage
                          className="error"
                          name="phones"
                          component="div"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              />

              <h4 className="h4">Facebook</h4>
              <Field type="text" name="facebook" />

              <h4 className="h4">Instagram</h4>
              <Field type="text" name="instagram" />

              <h4 className="h4">LINE ID</h4>
              <Field type="text" name="lineID" />

              <h4 className="h4">Twitter</h4>
              <Field type="text" name="twitter" />

              <h4 className="h4">Description</h4>
              <Field
                name="description"
                render={({field}) => <textarea {...field}></textarea>}
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

export default BasicInfoForm;
