import { Formik, Form, Field, ErrorMessage } from "formik";
import needsData from "./needsData";
import { useState } from "react";

const FormData = () => {
  const [needs, setNeeds] = useState(needsData);

  function handleAdd(e) {
    e.preventDefault();
  }

  function handleDelete(e) {
    e.preventDefault();

    setNeeds(needs.filter((item) => item.id !== Number(e.target.value)));
  }
  // return (
  //   <Formik
  //      initialValues={{
  //        'owner.fullname': '',
  //      }}
  //      onSubmit={values => {
  //        // same shape as initial values
  //        console.log(values);
  //      }}
  //    >
  //      <Form>
  //        <Field name="['owner.fullname']" />
  //        <button type="submit">Submit</button>
  //      </Form>
  //    </Formik>
  // )

  return (
    <Formik
      initialValues={{
        name: undefined,
        address: undefined,
        postcode: undefined,
        phone: undefined,
        email: undefined,
        imgUrl: undefined,
        needs: undefined,
        distance: undefined,
        lat_lng: undefined,
      }}
      onSubmit={(values, actions) => {
        console.log("These are the values:", values);
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
      validate={(values) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const errors = {};
        if (!values.name) {
          errors.name = "Name Required";
        }
        if (!values.email || !emailRegex.test(values.email)) {
          errors.email = "Valid Email Required";
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => {
        console.log(errors);
        return (
          <Form name="needs-form" data-netlify="true" method="POST">
            <div className="row">
              <div className="col-25">
                <label htmlFor="name">Name: </label>
              </div>
              <div className="col-75">
                <Field className="inputs" name="name" placeholder="Name" />
                <p className="error-message">
                  <ErrorMessage name="name" />
                </p>
              </div>
            </div>
            <div className="col-25">
              <label htmlFor="address">Address: </label>
            </div>
            <div className="col-75">
              <Field className="inputs" name="address" placeholder="Address" />
              <p className="error-message">
                <ErrorMessage name="address" />
              </p>
            </div>
            <div className="col-25">
              <label htmlFor="postcode">Post-code </label>
            </div>
            <div className="col-75">
              <Field
                className="inputs"
                name="postcode"
                placeholder="Post-Code"
              />
              <p className="error-message">
                <ErrorMessage name="postcode" />
              </p>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="phone">Phone </label>
              </div>
              <div className="col-75">
                <Field className="inputs" name="phone" placeholder="Phone" />
                <p className="error-message">
                  <ErrorMessage name="phone" />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="email">Email</label>
              </div>
              <div className="col-75">
                <Field className="inputs" name="email" placeholder="Email" />
                <p className="error-message">
                  <ErrorMessage name="email" />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="imgurl">Image Url </label>
              </div>
              <div className="col-75">
                <Field
                  className="inputs"
                  name="imgurl"
                  placeholder="Image Url"
                />
                <p className="error-message">
                  <ErrorMessage name="imgurl" />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="needs">Needs </label>
              </div>
              <div className="col-75">
                <Field
                  className="inputs"
                  name="needs"
                  placeholder="Needs"
                  onChange={handleChange}
                />

                <button onClick={handleAdd}>+</button>
                <p className="error-message">
                  <ErrorMessage name="needs" />
                </p>
              </div>
            </div>
            {needs.map((needsData) => {
              return (
                <p>
                  {needsData.name}
                  <button value={needsData.id} onClick={handleDelete}>
                    -
                  </button>
                </p>
              );
            })}

            <div className="row">
              <div className="col-25">
                <label htmlFor="distance">Distance </label>
              </div>
              <div className="col-75">
                <Field
                  className="inputs"
                  name="distance"
                  placeholder="Distance"
                />
                <p className="error-message">
                  <ErrorMessage name="distance" />
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="lat_lng">Latitude and Longitude</label>
              </div>
              <div className="col-75">
                <Field
                  className="inputs"
                  name="lat_lng"
                  placeholder="Latitude and Longitude"
                />
                <p className="error-message">
                  <ErrorMessage name="lat_lng" />
                </p>
              </div>
            </div>
            <div className="col-100">
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-admin"
              >
                Send
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormData;
