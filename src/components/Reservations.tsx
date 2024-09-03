import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { StyledPaper } from "../pages/CustomerPanel";
import axios from "axios";
import { mainRoute } from "../config";
import toast, { Toaster } from "react-hot-toast";

const RESERVATION_TYPES = {
  ROOMS: 1,
  BANQUET_HALLS: 2
};

const roomValidationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Name is required"),
  customer_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  check_in_date: Yup.date().required("Check-in date is required"),
  check_out_date: Yup.date()
    .required("Check-out date is required")
    .min(
      Yup.ref("check_in_date"),
      "Check-out date must be after check-in date"
    ),
  num_adults: Yup.number()
    .required("Number of guests is required")
    .min(1, "At least 1 guest is required")
});

const banquetValidationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Name is required"),
  customer_email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  banquet: Yup.string().required("Select a banquet hall"),
  guests: Yup.number()
    .required("Number of guests is required")
    .min(1, "At least 1 guest is required")
});

export const Reservations = () => {
  const [reservationType, setReservationType] = useState(
    RESERVATION_TYPES.ROOMS
  );
  const navigate = useNavigate();

  const handleReservationSubmit = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    try {
      const response = await axios.post(`${mainRoute}/reservation`, {
        customer_name: values.customer_name,
        customer_email: values.customer_email,
        num_adults: values.num_adults,
        check_in_date: values.check_in_date,
        check_out_date: values.check_out_date,
        reservation_type: "room"
      });

      if (response?.data?.room_number) {
        toast(
          `Room Booked successfully !. Your ROOM NUMBER : ${response?.data?.room_number}`,
          {
            icon: "✅",
            duration: 10000
          }
        );
        resetForm();
      }
      console.log("response =>", response);
    } catch (error) {
      toast("Error on booking room", {
        icon: "🚫"
      });
      console.log(error);
    }
    // Handle reservation submission here
    console.log(values);
    setSubmitting(false);
  };

  const handleReservationTypeChange = (type) => {
    setReservationType(type);
  };

  return (
    <Box className="reservation-modal" display="flex" flexDirection="column">
      <Toaster />
      <h1 className="reservation-title">Reservations</h1>

      <StyledPaper className="reservation-type-tiles">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() => handleReservationTypeChange(RESERVATION_TYPES.ROOMS)}
          >
            <Card
              className={`availability-card rooms-card ${
                reservationType === RESERVATION_TYPES.ROOMS
                  ? "selected-reservation"
                  : ""
              }`}
              elevation={3}
            >
              <CardContent>
                <HotelIcon className="availability-icon" />
                <Typography variant="h6" color="primary">
                  Rooms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() =>
              handleReservationTypeChange(RESERVATION_TYPES.BANQUET_HALLS)
            }
          >
            <Card
              className={`availability-card halls-card ${
                reservationType === RESERVATION_TYPES.BANQUET_HALLS
                  ? "selected-reservation"
                  : ""
              }`}
              elevation={3}
            >
              <CardContent>
                <MeetingRoomIcon className="availability-icon" />
                <Typography variant="h6" color="primary">
                  Banquet Halls
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </StyledPaper>

      {reservationType === RESERVATION_TYPES.ROOMS && (
        <Formik
          initialValues={{
            customer_name: "",
            customer_email: "",
            check_in_date: "",
            check_out_date: "",
            num_adults: 1
          }}
          validationSchema={roomValidationSchema}
          onSubmit={handleReservationSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="customer_name"
                error={touched.customer_name && errors.customer_name}
                helperText={touched.customer_name && errors.customer_name}
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="customer_email"
                type="email"
                error={touched.customer_email && errors.customer_email}
                helperText={touched.customer_email && errors.customer_email}
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Check-in Date"
                name="check_in_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={touched.check_in_date && errors.check_in_date}
                helperText={touched.check_in_date && errors.check_in_date}
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Check-out Date"
                name="check_out_date"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={touched.check_out_date && errors.check_out_date}
                helperText={touched.check_out_date && errors.check_out_date}
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Number of Guests"
                name="guests"
                type="number"
                error={touched.guests && errors.guests}
                helperText={touched.guests && errors.guests}
                margin="normal"
                variant="outlined"
              />
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/home")}
                  disabled={isSubmitting}
                  className="reservation-cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Room Reservation"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {reservationType === RESERVATION_TYPES.BANQUET_HALLS && (
        <Formik
          initialValues={{
            customer_name: "",
            customer_email: "",
            banquet: "",
            guests: 1
          }}
          validationSchema={banquetValidationSchema}
          onSubmit={handleReservationSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="customer_name"
                error={touched.customer_name && errors.customer_name}
                helperText={touched.customer_name && errors.customer_name}
                margin="normal"
                variant="outlined"
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="customer_email"
                type="email"
                error={touched.customer_email && errors.customer_email}
                helperText={touched.customer_email && errors.customer_email}
                margin="normal"
                variant="outlined"
              />
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel id="banquet-label">Banquet Hall</InputLabel>
                <Field
                  as={Select}
                  labelId="banquet-label"
                  name="banquet"
                  label="Banquet Hall"
                  error={touched.banquet && errors.banquet}
                >
                  <MenuItem value="">
                    <em>Select a Banquet Hall</em>
                  </MenuItem>
                  <MenuItem value="red">Red</MenuItem>
                  <MenuItem value="green">Green</MenuItem>
                  <MenuItem value="blue">Blue</MenuItem>
                </Field>
                {touched.banquet && errors.banquet && (
                  <FormHelperText error>{errors.banquet}</FormHelperText>
                )}
              </FormControl>
              <Field
                as={TextField}
                fullWidth
                label="Number of Guests"
                name="guests"
                type="number"
                error={touched.guests && errors.guests}
                helperText={touched.guests && errors.guests}
                margin="normal"
                variant="outlined"
              />
              <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/home")}
                  disabled={isSubmitting}
                  className="reservation-cancel-button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Banquet Hall Reservation"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};
