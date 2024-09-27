import {
  Box,
  Button,
  Checkbox,
  Container,
  TextField,
  Typography
} from "@mui/material";
import { Datepicker } from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import ModalComponent from "./Modal";

interface OfferAndServiceModalInterface {
  open: boolean;
  handleClose: () => {};
  formType: string;
  initialValues: Object;
  validationSchema: Object;
  handleSubmit: () => Promise<unknown>;
  selectedDate: string | null;
  isActive: boolean;
  modalType: "offers" | "services";
}

export const OfferAndServiceModal = ({
  open,
  handleClose,
  formType,
  initialValues,
  validationSchema,
  handleSubmit,
  selectedDate,
  isActive,
  modalType
}: OfferAndServiceModalInterface) => {
  return (
    <ModalComponent open={open} handleClose={handleClose}>
      <Container maxWidth="sm">
        <Box mb={4}>
          <Typography variant="h4" className="form-title basic-font-color">
            {`${formType} ${modalType === "offers" ? "Offer" : "Service"}`}
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
              {modalType == "offers" && (
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
              )}
              {modalType === "offers" && (
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
                        minDate={new Date()}
                      />
                    </Box>
                  </Box>
                </div>
              )}
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
  );
};
