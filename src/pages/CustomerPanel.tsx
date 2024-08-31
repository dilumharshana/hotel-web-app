import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import HotelIcon from "@mui/icons-material/Hotel";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Modal,
  Box,
  IconButton,
  CardMedia
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./CustomerPanel.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  backgroundColor: "#f8f8f8",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
}));

const CustomerPanel = ({ availableRooms = 0, availableBanquetHalls = 0 }) => {
  const [offers, setOffers] = useState([]);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [offersResponse, servicesResponse] = await Promise.all([
        axios.get("http://127.0.0.1:5000/offers"),
        axios.get("http://127.0.0.1:5000/services")
      ]);
      setOffers(offersResponse.data.offers);
      setServices(servicesResponse.data.services);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenReservationModal = () => {
    setIsReservationModalOpen(true);
  };

  const handleCloseReservationModal = () => {
    setIsReservationModalOpen(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required")
  });

  const reservationValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    checkIn: Yup.date().required("Check-in date is required"),
    checkOut: Yup.date()
      .required("Check-out date is required")
      .min(Yup.ref("checkIn"), "Check-out date must be after check-in date"),
    guests: Yup.number()
      .required("Number of guests is required")
      .min(1, "At least 1 guest is required")
  });

  const handleInquirySubmit = (values, { setSubmitting, resetForm }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  const handleReservationSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle reservation submission here
    console.log(values);
    setSubmitting(false);
    resetForm();
    handleCloseReservationModal();
  };

  if (isLoading) {
    return (
      <Container maxWidth={false} className="customer-panel">
        <div className="loading-container">
          <CircularProgress />
          <Typography variant="h6">Loading...</Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} className="customer-panel">
      <div className="main-content">
        <div className="left-content">
          {/* Carousel code remains the same */}

          <StyledPaper className="availability-tiles">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="availability-card rooms-card" elevation={3}>
                  <CardContent>
                    <HotelIcon className="availability-icon" />
                    <Typography variant="h6" color="primary">
                      Available Rooms
                    </Typography>
                    <Typography variant="h3" color="textPrimary">
                      {availableRooms}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="availability-card halls-card" elevation={3}>
                  <CardContent>
                    <MeetingRoomIcon className="availability-icon" />
                    <Typography variant="h6" color="primary">
                      Available Banquet Halls
                    </Typography>
                    <Typography variant="h3" color="textPrimary">
                      {availableBanquetHalls}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="availability-card rooms-card" elevation={3}>
                  <CardContent>
                    <StyledPaper className="reservation-section">
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className="reservation-button"
                        onClick={handleOpenReservationModal}
                      >
                        Make a Reservation
                      </Button>
                    </StyledPaper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </StyledPaper>

          <StyledPaper className="offers-services-container">
            <Typography variant="h5" className="section-title">
              <LocalOfferIcon className="section-icon" /> Special Offers
            </Typography>
            <Grid container spacing={3} mt={3}>
              {offers?.map((offer, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card className="offer-card">
                    <CardContent>
                      <Typography variant="h6">{offer.NAME}</Typography>
                      <small variant="h6 gray-color-font">{`Valid till - ${new Date(
                        offer?.ENDING_DATE
                      ).toDateString()}`}</small>
                      {offer?.THUMBNAIL && (
                        <CardMedia
                          component="img"
                          height="194"
                          image={offer?.THUMBNAIL}
                          alt={`${offer?.NAME} - image`}
                          style={{
                            maxHeight: "300px",
                            marginTop: "10px",
                            marginBottom: "15px"
                          }}
                        />
                      )}
                      <Typography variant="body2">
                        {offer.DESCRIPTION}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>

          <StyledPaper className="offers-services-container">
            <Typography variant="h5" className="section-title">
              <RoomServiceIcon className="section-icon" /> Our Services
            </Typography>
            <Grid container spacing={3} mt={3}>
              {services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className="customer-panel-service-card">
                    <CardContent className="customer-panel-service-card">
                      <Typography variant="h4">{service.NAME}</Typography>

                      <Typography variant="body2">
                        {service.DESCRIPTION}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </div>
      </div>

      <Grid container className="inquiry-form-container">
        <Grid sm={12} lg={4}>
          <Paper className="inquiry-form">
            <Typography variant="h5" color="primary" gutterBottom>
              Have a question? Send us an inquiry
            </Typography>
            <Formik
              initialValues={{ name: "", email: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleInquirySubmit}
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
                  <Field
                    as={TextField}
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    error={touched.message && errors.message}
                    helperText={touched.message && errors.message}
                    margin="normal"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={isReservationModalOpen}
        onClose={handleCloseReservationModal}
        aria-labelledby="reservation-modal-title"
      >
        <Box className="reservation-modal">
          <Typography id="reservation-modal-title" variant="h6" component="h2">
            Make a Reservation
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              checkIn: "",
              checkOut: "",
              guests: 1
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Reservation"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Container>
  );
};

export default CustomerPanel;
