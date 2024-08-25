import { useState } from "react";
import ModalComponent from "../components/Modal";
import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography
} from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Datepicker } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";

export const OffersModal = ({ mode = "create" }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Name is required")
  });

  const initialValues = {
    name: "",
    description: "",
    isActive: "",
    thumbnailUrl: "",
    endingDate: new Date().toDateString()
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      console.log(values);

      // Handle form submission here
      const response: any = await axios.post("http://127.0.0.1:5000/offer", {
        ...values,
        endingDate: new Date(values.endingDate).toLocaleDateString("en-CA")
      });

      console.log(response);

      if (response.data.offerId) {
        handleClose();
        toast("Offer created successfully !.", {
          icon: "✅"
        });
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formType = mode == "create" ? "Create" : "Edit";

  return (
    <>
      <Toaster />
      <Button variant="outlined" onClick={handleOpen}>
        {`Create`} Offer
      </Button>
      <ModalComponent open={open} handleClose={handleClose}>
        <Container maxWidth="sm">
          <Box mb={4}>
            <Typography variant="h4" className="form-title basic-font-color">
              {`${formType} Offer`}
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isValid, dirty, setFieldValue }) => (
              <Form>
                <div className="form-field">
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Offer Name"
                    error={touched.name && errors.name}
                    helperText={<ErrorMessage name="name" />}
                  />
                </div>
                <div className="form-field">
                  <Field
                    as={TextField}
                    fullWidth
                    name="description"
                    label="Description"
                    error={touched.description && errors.description}
                    helperText={<ErrorMessage name="email" />}
                  />
                </div>
                <div className="form-field">
                  <Field
                    as={TextField}
                    fullWidth
                    name="thumbnailUrl"
                    label="URL of offer banner"
                    error={touched.thumbnailUrl && errors.thumbnailUrl}
                    helperText={<ErrorMessage name="contactNumber" />}
                  />
                </div>
                <div className="form-field">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box className="offer-end-date-input-label-container">
                      Offer end date
                    </Box>
                    <Box className="offer-end-date-input-container">
                      <Datepicker
                        onSelectedDateChanged={(date) =>
                          setFieldValue("endingDate", date)
                        }
                      />
                    </Box>
                  </Box>
                </div>
                <div className="form-field">
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Field
                        as={Checkbox}
                        fullWidth
                        name="isActive"
                        label="Offer is active"
                        error={touched.isActive && errors.isActive}
                        helperText={<ErrorMessage name="verifyPassword" />}
                      />
                    </Box>
                    <Box className="gray-color-font">Offer is Active</Box>
                  </Box>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                  disabled={!(isValid && dirty)}
                >
                  Create
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </ModalComponent>
    </>
  );
};
