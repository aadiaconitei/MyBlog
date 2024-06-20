import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Login.css";

import { useNavigate, Link,Navigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import configData from "../config.json";

export default function Register() {
  let navigate = useNavigate();
  const { authenticated } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    nume: Yup.string().required("Camp obligatoriu!"),
    prenume: Yup.string().required("Camp obligatoriu!"),
    email: Yup.string()
      .email("Adresa de email invalida!")
      .required("Camp obligatoriu!"),
    parola: Yup.string()
      .required("Camp obligatoriu!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain min 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: Yup.string()
      .label("Confirma parola")
      .required("Camp obligatoriu!")
      .oneOf([Yup.ref("parola"), null], "Passwords must match"),
  });
  const [formData, setFormData] = useState({
    nume: "",
    prenume: "",
    email: "",
    parola: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    // Perform registration logic here, e.g., send form data to server
    console.log(formData);

    delete formData.confirm_password;
    console.log(formData);
    axios
      .post(configData.SERVER_URL, formData)
      .then((res) => {
        if (res.status === 200) {
          alert("User successfully created");
          console.log(res.message);
          
          navigate("/mylogin");
        } else Promise.reject();
      })
      .catch((err) => {
        alert("Something went wrong");
        console.log(err.response.data);
      });
    // setFormData(values => ({}))
  };
  console.log('authenticated', authenticated);
  if (authenticated) {
    // Redirect
    alert(1234);
    return <Navigate replace to="/posts" />;
    
  } else {
    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Regiter</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="login-wrap px-4 px-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon="fa-solid fa-user" />
                </div>
                <h3 className="text-center mb-4">
                  Completeaza corect campurile!
                </h3>
                <Formik
                  initialValues={formData}
                  onSubmit={handleSubmit}
                  enableReinitialize
                  validationSchema={validationSchema}
                >
                  <Form>
                    <FormGroup>
                      <label htmlFor="nume">Nume</label>
                      <Field
                        name="nume"
                        type="text"
                        className="form-control"
                        placeholder="Nume"
                        onChange={handleInputChange}
                      />
                      <ErrorMessage
                        name="nume"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="prenume">Prenume</label>
                      <Field
                        name="prenume"
                        type="text"
                        className="form-control"
                        onChange={handleInputChange}
                      />
                      <ErrorMessage
                        name="prenume"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="email">Adresa de email</label>
                      <Field
                        name="email"
                        type="text"
                        className="form-control rounded-left"
                        onChange={handleInputChange}
                      />
                      <ErrorMessage
                        name="email"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>

                    <FormGroup>
                      <label htmlFor="parola">Parola</label>
                      <Field
                        name="parola"
                        type="password"
                        autoComplete="off"
                        className="form-control rounded-left"
                        onChange={handleInputChange}
                      />

                      <ErrorMessage
                        name="parola"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>
                    <FormGroup>
                      <label htmlFor="confirm_password">Confirma Parola</label>
                      <Field
                        name="confirm_password"
                        type="password"
                        autoComplete="off"
                        className="form-control rounded-left"
                        onChange={handleInputChange}
                      />

                      <ErrorMessage
                        name="confirm_password"
                        className="d-block invalid-feedback"
                        component="span"
                      />
                    </FormGroup>
                    <FormGroup>
                      <div className="w-50 text-md-right float-end">
                        <Link to="/mylogin" className="nav-link login">
                          Aveti deja cont? Login
                        </Link>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        variant="danger"
                        size="lg"
                        className=" btn btn-primary rounded submit p-3 px-5 mt-3 mb-4"
                        block="block"
                        type="submit"
                      >
                        Inregistreaza-te
                      </Button>
                    </FormGroup>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}