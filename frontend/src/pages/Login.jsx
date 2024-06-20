import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Login.css";

import { useNavigate, Link } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";
import { AuthContext } from "../context/authContext";

export default function Login() {
  let navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Adresa de email invalida!")
      .required("Camp obligatoriu!"),
    parola: Yup.string()
      .required("Camp obligatoriu!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "Must Contain min 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const [formData, setFormData] = useState({
    email: "",
    parola: "",
  });
  const [err, setError] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    try {
      await login(formData); // await axios.post("/users/login", inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <section className="ftco-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-5">
            <h2 className="heading-section">Login</h2>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </div>
              <h3 className="text-center mb-4">Aveti deja cont?</h3>
              {err && <p>{err}</p>}
              <Formik
                initialValues={formData}
                onSubmit={handleSubmit}
                enableReinitialize
                validationSchema={validationSchema}
              >
                <Form>
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
                    <Button
                      variant="danger"
                      size="lg"
                      className=" btn btn-primary rounded submit p-3 px-5 mt-3"
                      block="block"
                      type="submit"
                    >
                      Login
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <div className="w-100 text-md-right">
                      <Link to="/myregister" className="nav-link login">
                        Daca nu ai cont: Register
                      </Link>
                    </div>
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
