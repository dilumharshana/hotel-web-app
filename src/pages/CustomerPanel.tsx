import HotelIcon from "@mui/icons-material/Hotel";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { mainRoute } from "../config";
import toast, { Toaster } from "react-hot-toast";

export const StyledPaper = styled(Paper)(({ theme }) => ({
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
  const navigate = useNavigate();

  let customerData = localStorage.getItem("customer_data") || null;

  if (customerData) {
    customerData = JSON.parse(customerData);
  }

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

  const handleReservations = () => {
    navigate("/reservations");
  };

  const validationSchema = Yup.object().shape({
    contactNumber: Yup.number().required("Contact number is required"),
    message: Yup.string().required("Message is required")
  });

  const handleInquirySubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${mainRoute}inquiry`, {
        customer_id: customerData?.customer_id,
        message: values.message,
        contactNumber: values.contactNumber
      });

      if (response?.data?.inquiryId) {
        resetForm();
        toast("Inquiry submitted successfully !.", {
          icon: "✅"
        });
      }
    } catch (error) { }
  };

  const handleLogOut = () => {
    localStorage.removeItem("customer_data");
    navigate("/");
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
      <Toaster />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={handleLogOut} variant="outlined" color="warning">
          Log out
        </Button>
      </Box>
      <h1 style={{ fontSize: "25px" }}>Welcome back, Jhon 🎉</h1>
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
                      Rooms
                    </Typography>
                    <Typography variant="h3" color="textPrimary">

                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} lg={4}>
                <Card className="availability-card halls-card" elevation={3}>
                  <CardContent>
                    <MeetingRoomIcon className="availability-icon" />
                    <Typography variant="h6" color="primary">
                      Banquet Halls ( coming soon )
                    </Typography>
                    <Typography variant="h3" color="textPrimary">

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
                        onClick={handleReservations}
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
              {offers?.map((offer, index) => {

                if (offer?.IS_ACTIVE == 0) return <></>
                return <Grid item xs={12} sm={6} md={3} key={index}>
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
              })}
            </Grid>
          </StyledPaper>

          <StyledPaper className="offers-services-container">
            <Typography variant="h5" className="section-title">
              <RoomServiceIcon className="section-icon" /> Our Services
            </Typography>
            <Grid container spacing={3} mt={3}>
              {services.map((service, index) => {
                if (service?.IS_ACTIVE == 0) return <></>

                return <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card className="customer-panel-service-card">
                    <CardContent className="customer-panel-service-card">
                      <Typography variant="h4">{service.NAME}</Typography>

                      <Typography variant="body2">
                        {service.DESCRIPTION}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              })}
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
              initialValues={{ contactNumber: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleInquirySubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    label="Contact number"
                    name="contactNumber"
                    type="contactNumber"
                    error={touched.contactNumber && errors.contactNumber}
                    helperText={touched.contactNumber && errors.contactNumber}
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
    </Container>
  );
};

export default CustomerPanel;
