import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Offer {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  endingDate: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

const HomeLanding = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [searchResults, setSearchResults] = useState<(Offer | Service)[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offersResponse = await axios.get("http://127.0.0.1:5000/offers");
        const servicesResponse = await axios.get(
          "http://127.0.0.1:5000/services"
        );
        setOffers(offersResponse.data.offers);
        setServices(servicesResponse.data.services);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredOffers = offers.filter(
      (offer) =>
        offer.NAME.toLowerCase().includes(term) ||
        offer.DESCRIPTION.toLowerCase().includes(term)
    );
    const filteredServices = services.filter(
      (service) =>
        service.NAME.toLowerCase().includes(term) ||
        service.DESCRIPTION.toLowerCase().includes(term)
    );

    setSearchResults([...filteredOffers, ...filteredServices]);
  };

  const renderCard = (item: Offer | Service,) => {


    const isServiceItem = item?.THUMBNAIL == "" || item?.THUMBNAIL == null;

    if (item?.IS_ACTIVE == 0) return <></>

    return <Card className={`offer-card service-card`} key={item.id}>
      <div className="card-media-overlay">
        {item.THUMBNAIL && (
          <CardMedia
            className="card-media"
            image={item.THUMBNAIL}
            title={item.name}
          />
        )}
        {/* Add a tag for offers */}
        {"endingDate" in item && (
          <span className="card-tag">Limited Time Offer</span>
        )}
      </div>
      <CardContent className="card-content" style={{ background: isServiceItem ? "#39bf24" : "#ffd000", color: "#fff" }}>
        <Typography className="card-title" variant="h5" component="h2">
          {item.NAME}
        </Typography>
        <Typography
          className="card-description"
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {item.DESCRIPTION}
        </Typography>
        {"endingDate" in item && (
          <Typography className="card-date" variant="body2" component="p">
            Ends on: {item.ENDING_DATE}
          </Typography>
        )}
        <Button className="card-cta-button" size="small" color="primary">
          Learn More
        </Button>
      </CardContent>
    </Card>
  };

  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="header-content">
          <h1>ABC Restaurant</h1>
          <p>Experience the luxury..</p>
          <br />
          <p>Kandy - Colombo - Galle - Mount Lavinia</p>
        </div>
        <nav className="nav-buttons">
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/login")}
            className="nav-button"
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/signup")}
            className="nav-button"
          >
            Sign Up for free
          </Button>
        </nav>
      </header>

      <Container maxWidth="lg" className="main-content">
        <Box sx={{ my: 4 }}>
          <TextField
            fullWidth
            label="Search offers and services"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>

        {searchTerm && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" style={{ fontFamily: "Arial" }} gutterBottom>
              Search Results
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                p: 1,
                "&::-webkit-scrollbar": { display: "none" }
              }}
            >
              {searchResults.map(renderCard)}
            </Box>
          </Box>
        )}

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" style={{ fontFamily: "Arial" }} gutterBottom>
                Explore Our Special Offers
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  p: 1,
                  "&::-webkit-scrollbar": { display: "none" }
                }}
              >
                {offers.map(renderCard)}
              </Box>
            </Box>

            <Box >
              <Typography variant="h4" style={{ fontFamily: "Arial" }} gutterBottom>
                Explore Our Services
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  p: 1,
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {services.map(renderCard)}
              </Box>
            </Box>
          </>
        )}

        <div style={{ marginTop: "40px" }}>
          <Typography variant="h4" style={{ fontFamily: "Arial" }} gutterBottom>
            About our restaurant ...
          </Typography>
        </div>

        <div style={{ marginTop: "40px", fontFamily: "arial", color: "#333333", fontSize: "18px", textAlign: "justify" }}>
          Welcome to ABC Restaurant, where culinary excellence meets unparalleled hospitality. Our restaurant offers an exquisite dining experience in a variety of elegantly designed rooms, each tailored to provide a unique ambiance for every occasion. Whether you're looking to host a private celebration, enjoy a family meal, or indulge in a romantic dinner, our diverse selection of rooms and services ensures a memorable experience.
        </div>

        <div style={{ marginTop: "10px", fontFamily: "arial", color: "#333333", fontSize: "18px", textAlign: "justify" }}>
          From intimate gatherings in our cozy private dining rooms to large events in our spacious banquet hall, we cater to all your needs with precision and care. Our menu features a delightful fusion of classic and contemporary dishes, crafted from the freshest ingredients and prepared by our expert chefs. In addition to our dining options, we offer personalized event planning services to help you create the perfect atmosphere, whether it's a wedding, corporate event, or a special milestone.
        </div>

        <div style={{ marginTop: "10px", fontFamily: "arial", color: "#333333", fontSize: "18px", textAlign: "justify" }}>
          At ABC Restaurant, we believe that every meal should be a celebration, and we are committed to making your visit extraordinary. Our friendly staff is dedicated to providing impeccable service, ensuring that your time with us is nothing short of perfect. Come and discover why ABC Restaurant is the premier destination for fine dining and unforgettable experiences.         </div>

        <div className="offer-banner">
          <h2>Special Offer!</h2>
          <p>Book now and get 20% off on your stay. Limited time offer.</p>

        </div>
      </Container>

      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://www.pioneer-cbh.com/app/uploads/sites/33/2021/08/25-PIONEER-BEACH-HOTEL-SUPERIOR-DELUXE-ROOM-SV.jpg"
                alt="Luxury Room"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Luxurious Rooms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Experience comfort and elegance in our spacious rooms with ABC
                  Restaurants.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://www.marinobeach.com/image/tides-01.png"
                alt="Fine Dining"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Exquisite Dining
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Savor delicious cuisine at our beachfront restaurant.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="https://i0.wp.com/letsrelaxspa.com/wp-content/uploads/2023/10/day-spa-treatment-room.jpg?resize=640%2C427"
                alt="Spa Services"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Relaxing Spa
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Unwind with our rejuvenating spa treatments and services.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer className="footer">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="body2">
                ABC Restaurant, Colombo 2
              </Typography>
              <Typography variant="body2">Phone: 011 2 345 134</Typography>
              <Typography variant="body2">
                Email: info@abcrestaurant.com
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Quick Links</Typography>
              <ul>
                <li>
                  <a href="#rooms">Rooms</a>
                </li>
                <li>
                  <a href="#dining">Dining</a>
                </li>
                <li>
                  <a href="#amenities">Amenities</a>
                </li>
                <li>
                  <a href="#events">Events</a>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Newsletter</Typography>
              <Typography variant="body2">
                Subscribe to our newsletter for exclusive offers and updates.
              </Typography>

            </Grid>
          </Grid>

        </Container>
      </footer>
    </div>
  );
};

export default HomeLanding;
