import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { Datepicker } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";
import ModalComponent from "../components/Modal";

export const OffersModal = ({
  open = false,
  handleClose = () => {},
  mode = "create",
  data = null,
  handleLoadOffers = () => {},
  toast = () => {}
}: {
  open: boolean;
  handleClose: Function;
  mode: string;
  data: Object | null;
  handleLoadOffers: Function;
  toast: Function;
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Name is required")
  });

  const selectedDate = data?.ENDING_DATE
    ? new Date(data?.ENDING_DATE).toLocaleDateString()
    : new Date().toLocaleDateString();

  let isActive = true;

  if (data) {
    isActive = data?.IS_ACTIVE == 1 ? true : false;
  }

  const initialValues = {
    name: data?.NAME ?? "",
    description: data?.DESCRIPTION ?? "",
    isActive: isActive,
    thumbnailUrl: data?.THUMBNAIL ?? "",
    endingDate: selectedDate
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    try {
      console.log(values);

      // Handle form submission here
      let response: any = null;

      const payload = {
        ...values,
        isActive: values.isActive === true ? 1 : 0,
        endingDate: new Date(values.endingDate).toLocaleDateString("en-CA")
      };

      if (mode == "create") {
        response = await axios.post("http://127.0.0.1:5000/offer", payload);
      } else {
        response = await axios.put("http://127.0.0.1:5000/offer", {
          ...payload,
          id: data?.ID
        });
      }

      if (response.data.offerId) {
        toast("Offer created successfully !.", {
          icon: "✅"
        });
        handleClose();
      }

      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      handleLoadOffers();
    }
  };

  const formType = mode == "create" ? "Create" : "Edit";

  return (
    <>
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
                    helperText={<ErrorMessage name="description" />}
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
                        value={selectedDate}
                      />
                    </Box>
                  </Box>
                </div>
                <div className="form-field">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Box className="offer-end-date-input-label-container">
                      Offer is active
                    </Box>
                    <Box className="offer-end-date-input-container">
                      <Checkbox
                        onChange={(e) => {
                          console.log(e.target.checked);

                          setFieldValue("isActive", e.target.checked);
                        }}
                        defaultChecked={isActive}
                      />
                    </Box>
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
                  {formType}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </ModalComponent>
    </>
  );
};
