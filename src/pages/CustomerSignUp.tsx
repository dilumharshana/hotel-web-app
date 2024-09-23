import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { Route, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contactNumber: Yup.string()
    .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
    .required("Contact number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  verifyPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please verify your password")
});

const RegistrationForm: React.FC = () => {
  const [customerCreated, setCustomerCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (customerCreated) {
      setTimeout(() => navigate("/login"), 2000);
    }
  }, [customerCreated]);

  const initialValues = {
    name: "",
    email: "",
    contactNumber: "",
    password: "",
    verifyPassword: ""
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      // Handle form submission here
      const response: any = await axios.post(
        "http://127.0.0.1:5000/customer",
        values
      );

      console.log(response);

      if (response.data.customerId) {
        setCustomerCreated(true);
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container className="registration-container">
      <Grid item xs={12} md={6} className="banner-panel">
        <Typography variant="h2">Sign Up for free</Typography>
      </Grid>
      <Grid item xs={12} md={6} className="form-panel">
        {!customerCreated && (
          <Container maxWidth="sm">
            <Box mb={4}>
              <Typography variant="h4" className="form-title basic-font-color">
                Customer Registration
              </Typography>
            </Box>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid, dirty }) => (
                <Form>
                  <div className="form-field">
                    <Field
                      as={TextField}
                      fullWidth
                      name="name"
                      label="Name"
                      error={touched.name && errors.name}
                      helperText={<ErrorMessage name="name" />}
                    />
                  </div>
                  <div className="form-field">
                    <Field
                      as={TextField}
                      fullWidth
                      name="email"
                      label="Email"
                      error={touched.email && errors.email}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </div>
                  <div className="form-field">
                    <Field
                      as={TextField}
                      fullWidth
                      name="contactNumber"
                      label="Contact Number"
                      error={touched.contactNumber && errors.contactNumber}
                      helperText={<ErrorMessage name="contactNumber" />}
                    />
                  </div>
                  <div className="form-field">
                    <Field
                      as={TextField}
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      error={touched.password && errors.password}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </div>
                  <div className="form-field">
                    <Field
                      as={TextField}
                      fullWidth
                      name="verifyPassword"
                      label="Verify Password"
                      type="password"
                      error={touched.verifyPassword && errors.verifyPassword}
                      helperText={<ErrorMessage name="verifyPassword" />}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="submit-button"
                    disabled={!(isValid && dirty)}
                  >
                    Register
                  </Button>
                </Form>
              )}
            </Formik>
          </Container>
        )}
        {customerCreated && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4" className="form-title basic-font-color">
              Registration Complete !. Thank you
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
