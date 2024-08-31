import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
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
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { StyledPaper } from "../pages/CustomerPanel";
import "../pages/CustomerPanel.css";
import { useState } from "react";

const RESERVATION_TYPES = {
  ROOMS: 1,
  BANQUET_HALLS: 2
};

export const Reservations = ({}) => {
  const [reservationType, setReservationType] = useState(
    RESERVATION_TYPES.ROOMS
  );
  const navigate = useNavigate();

  const reservationValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    checkIn: Yup.date().required("Check-in date is required"),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .min(Yup.ref("checkIn"), "Check-out date must be after check-in date"),
    guests: Yup.number()
      .required("Number of guests is required")
      .min(1, "At least 1 guest is required"),
    banquet: Yup.string().required("Select a banquet hall")
  });

  const handleReservationSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle reservation submission here
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <Box className="reservation-modal" display="flex" flexDirection="column">
      <h1 className="reservation-title">Reservations</h1>

      <StyledPaper className="reservation-type-tiles ">
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={6}
            onClick={() => setReservationType(RESERVATION_TYPES.ROOMS)}
          >
            <Card
              className={`availability-card rooms-card ${
                reservationType == RESERVATION_TYPES.ROOMS
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
            onClick={() => setReservationType(RESERVATION_TYPES.BANQUET_HALLS)}
          >
            <Card
              className={`availability-card halls-card ${
                reservationType == RESERVATION_TYPES.BANQUET_HALLS
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

      <Formik
        initialValues={{
          name: "",
          email: "",
          checkIn: "",
          checkOut: "",
          guests: 1,
          banquet: null
        }}
        validationSchema={reservationValidationSchema}
        onSubmit={handleReservationSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              label="Name"
              name="name"
              error={touched.name && errors.name}
              helperText={touched.name && errors.name}
              margin="normal"
              variant="outlined"
            />
            <Field
              as={TextField}
              fullWidth
              label="Email"
              name="email"
              type="email"
              error={touched.email && errors.email}
              helperText={touched.email && errors.email}
              margin="normal"
              variant="outlined"
            />

            {reservationType == RESERVATION_TYPES.ROOMS && (
              <>
                <Field
                  as={TextField}
                  fullWidth
                  label="Check-in Date"
                  name="checkIn"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.checkIn && errors.checkIn}
                  helperText={touched.checkIn && errors.checkIn}
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Check-out Date"
                  name="checkOut"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={touched.checkOut && errors.checkOut}
                  helperText={touched.checkOut && errors.checkOut}
                  margin="normal"
                  variant="outlined"
                />
              </>
            )}

            {reservationType == RESERVATION_TYPES.BANQUET_HALLS && (
              <>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="color-label">Banquet Hall</InputLabel>
                  <Field
                    as={Select}
                    labelId="color-label"
                    name="banquet"
                    label="Banquet Hall"
                    displayEmpty
                    error={touched.banquet && errors.banquet}
                    helperText={touched.banquet && errors.banquet}
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
              </>
            )}

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
                {isSubmitting ? "Submitting..." : "Submit Reservation"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
