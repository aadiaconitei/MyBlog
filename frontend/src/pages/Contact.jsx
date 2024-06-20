import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, FormGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = () => {
  // Schema de validare pentru formular
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Nume este obligatoriu!"),
    lastName: Yup.string().required("Prenume este obligatoriu!"),
    email: Yup.string()
      .email("Email invalid!")
      .required("Email este obligatoriu!"),
    message: Yup.string().required("Mesaj este obligatoriu!"),
  });

  // Handler pentru trimiterea formularului
  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    // Aici poți adăuga logica de trimitere a datelor (ex. trimite un email sau salvează într-o bază de date)
    console.log(values);
    setTimeout(() => {
      alert("Mesaj trimis cu succes!");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container className="my-5">
      <Row>
        {/* Coloana cu date de contact */}
        <Col md={6} className="mb-4">
          <h2>Contactează-ne</h2>
          <p>Adresa: Strada Exemplu nr. 123, Oraș, Țară</p>
          <p>Telefon: +40 123 456 789</p>
          <p>Email: contact@example.com</p>
          <p>Program: Luni - Vineri, 09:00 - 18:00</p>
        </Col>

        {/* Coloana cu formularul de contact */}
        <Col md={6}>
          <h2>Trimite-ne un mesaj</h2>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              message: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormGroup>
                  <label htmlFor="firstName">Nume</label>
                  <Field
                    name="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Nume"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="lastName">Prenume</label>
                  <Field
                    name="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Prenume"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Mesaj</label>
                  <Field
                    name="message"
                    as="textarea"
                    className="form-control"
                    placeholder="Scrie mesajul tău aici..."
                    rows="4"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger"
                  />
                </FormGroup>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3"
                >
                  Trimite mesajul
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.778846558752!2d26.096049776096287!3d44.437698501340414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff43f6fb02c7%3A0x26c89e2c4dcf30b5!2sLINK%20Academy!5e0!3m2!1sro!2sro!4v1718724901443!5m2!1sro!2sro"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            title="Harta Contact"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;